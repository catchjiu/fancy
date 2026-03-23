(function () {
    var state;

    function $(sel, root) {
        return (root || document).querySelector(sel);
    }

    function el(html) {
        var t = document.createElement('template');
        t.innerHTML = html.trim();
        return t.content.firstChild;
    }

    function parsePath(path) {
        return path.split('.').map(function (seg) {
            var m = seg.match(/^(\w+)\[(\d+)\]$/);
            if (m) return { arr: true, key: m[1], index: parseInt(m[2], 10) };
            return { arr: false, key: seg };
        });
    }

    function setDeep(obj, path, value) {
        var parts = parsePath(path);
        if (!parts.length) return;
        var cur = obj;
        for (var i = 0; i < parts.length - 1; i++) {
            var p = parts[i];
            if (p.arr) {
                if (!cur[p.key]) cur[p.key] = [];
                if (!cur[p.key][p.index]) cur[p.key][p.index] = {};
                cur = cur[p.key][p.index];
            } else {
                if (cur[p.key] === undefined) cur[p.key] = {};
                cur = cur[p.key];
            }
        }
        var last = parts[parts.length - 1];
        if (last.arr) {
            if (!cur[last.key]) cur[last.key] = [];
            cur[last.key][last.index] = value;
        } else {
            cur[last.key] = value;
        }
    }

    function getDeep(obj, path) {
        var parts = parsePath(path);
        var cur = obj;
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            if (cur == null) return '';
            if (p.arr) cur = cur[p.key] && cur[p.key][p.index];
            else cur = cur[p.key];
        }
        return cur === undefined || cur === null ? '' : cur;
    }

    function patch(path, value) {
        setDeep(state, path, value);
    }

    function save() {
        if (!window.CatchStore.saveAsync) {
            if (window.CatchStore.save(state)) showToast('Saved to this browser (localStorage).');
            else showToast('Could not save.', true);
            return;
        }
        window.CatchStore.saveAsync(state).then(function (r) {
            if (r.localOnly) {
                showToast('Saved locally. Set URL and anon key in js/supabase-config.js to use the database.');
            } else if (r.needAuth) {
                showToast(r.message, true);
            } else if (r.ok) {
                showToast('Saved to the database.');
            } else {
                showToast(r.error || 'Save failed. If you are signed in, ensure your user is in admin_users.', true);
            }
        });
    }

    function showToast(msg, err) {
        var t = $('#admin-toast');
        if (!t) return;
        t.textContent = msg;
        t.className =
            'fixed bottom-6 right-6 px-4 py-3 rounded-xl text-sm font-medium shadow-lg z-[200] transition-opacity ' +
            (err ? 'bg-red-900 text-white' : 'bg-[#3054ff] text-white');
        t.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(function () {
            t.classList.add('opacity-0', 'pointer-events-none');
        }, 3200);
    }

    function resetDefaults() {
        if (!confirm('Reset all content to built-in defaults?')) return;
        state = window.CatchStore.defaultData();
        window.CatchStore.save(state);
        render();
        showToast('Reset to defaults. Click Save to sync to the database if you use Supabase.');
    }

    function exportData() {
        var j = window.CatchStore.exportJson(state);
        var blob = new Blob([j], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'catch-academy-data.json';
        a.click();
        URL.revokeObjectURL(a.href);
    }

    function importData() {
        var raw = prompt('Paste exported JSON:');
        if (!raw) return;
        try {
            state = window.CatchStore.importJson(raw);
            render();
            showToast('Imported. Click Save to push to the database if you use Supabase.');
        } catch (e) {
            showToast('Invalid JSON: ' + e.message, true);
        }
    }

    function bindInputs(root) {
        root.querySelectorAll('[data-bind]').forEach(function (inp) {
            var path = inp.getAttribute('data-bind');
            var v = getDeep(state, path);
            if (inp.type === 'checkbox') inp.checked = !!v;
            else if (inp.tagName === 'SELECT') inp.value = v !== '' && v !== undefined && v !== null ? String(v) : '';
            else inp.value = v != null ? v : '';

            var ev = inp.type === 'checkbox' || inp.tagName === 'SELECT' ? 'change' : 'input';
            inp.addEventListener(ev, function () {
                var val = inp.type === 'checkbox' ? inp.checked : inp.value;
                if (inp.dataset.type === 'number') val = parseFloat(val) || 0;
                setDeep(state, path, val);
            });
        });
    }

    function renderSchedule(root) {
        var s = state.schedule;
        var html = '';
        html += '<div class="space-y-8 max-w-4xl">';
        html += '<div><h3 class="text-lg font-bold font-headline text-white mb-4">Hero &amp; headers</h3>';
        html += field('Hero subtitle', 'schedule.heroSubtitle', 'textarea');
        html += field('Booked section title', 'schedule.bookedSectionTitle');
        html += field('Active sessions label', 'schedule.bookedActiveLabel');
        html += field('List header template (use {count})', 'schedule.listHeaderTemplate');
        html += '</div>';

        html += '<div><h3 class="text-lg font-bold font-headline text-white mb-4">Credits / CTA card</h3>';
        html += field('Title', 'schedule.creditsCard.title');
        html += field('Body', 'schedule.creditsCard.body', 'textarea');
        html += field('Button label', 'schedule.creditsCard.buttonLabel');
        html += '</div>';

        html += '<div><h3 class="text-lg font-bold font-headline text-white mb-4">Booked class cards</h3>';
        s.booked.forEach(function (b, i) {
            html += '<div class="p-4 rounded-xl bg-surface-container-low ghost-border mb-4 space-y-3">';
            html += '<p class="text-xs font-bold text-primary uppercase">Card ' + (i + 1) + '</p>';
            html += field('Badge', 'schedule.booked[' + i + '].badge');
            html +=
                '<label class="block text-xs text-on-surface-variant mb-1">Badge style</label><select data-bind="schedule.booked[' + i + '].badgeStyle" class="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white"><option value="primary">Primary</option><option value="muted">Muted</option></select>';
            html += field('Category', 'schedule.booked[' + i + '].category');
            html += field('Title (before highlight)', 'schedule.booked[' + i + '].titleBefore');
            html += field('Highlight word', 'schedule.booked[' + i + '].titleHighlight');
            html += field('Title (after)', 'schedule.booked[' + i + '].titleAfter');
            html += field('Time', 'schedule.booked[' + i + '].time');
            html += field('Instructor name', 'schedule.booked[' + i + '].instructorName');
            html += field('Instructor image URL', 'schedule.booked[' + i + '].instructorImage', 'textarea');
            html += '</div>';
        });
        html += '</div>';

        html += '<div><h3 class="text-lg font-bold font-headline text-white mb-4">Calendar strip</h3>';
        html += '<p class="text-sm text-on-surface-variant mb-4">Seven day chips (label + day number).</p>';
        s.calendarDays.forEach(function (d, i) {
            html += '<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 p-3 rounded-lg bg-surface-container-low/50">';
            html += field('Day ' + (i + 1) + ' label', 'schedule.calendarDays[' + i + '].label');
            html += field('Date #', 'schedule.calendarDays[' + i + '].day');
            html +=
                '<label class="flex items-center gap-2 text-sm text-on-surface"><input type="checkbox" data-bind="schedule.calendarDays[' + i + '].active" class="rounded border-white/20" /> Active highlight</label>';
            html +=
                '<label class="flex items-center gap-2 text-sm text-on-surface"><input type="checkbox" data-bind="schedule.calendarDays[' + i + '].dimmed" class="rounded border-white/20" /> Dimmed</label>';
            html += '</div>';
        });
        html += '</div>';

        html += '<div><h3 class="text-lg font-bold font-headline text-white mb-4">Class schedule rows</h3>';
        html += '<p class="text-sm text-on-surface-variant mb-4">CTA: book (Book Spot), full (Fully Booked), join (Join Session).</p>';
        s.classes.forEach(function (c, i) {
            html += '<div class="p-4 rounded-xl bg-surface-container-low ghost-border mb-4 space-y-3">';
            html += '<p class="text-xs font-bold text-primary uppercase">Class ' + (i + 1) + '</p>';
            html += field('Time (e.g. 06:00)', 'schedule.classes[' + i + '].time');
            html += field('Time label', 'schedule.classes[' + i + '].timeLabel');
            html += field('Class title', 'schedule.classes[' + i + '].title');
            html += field('Belt / tag', 'schedule.classes[' + i + '].beltTag');
            html +=
                '<label class="block text-xs text-on-surface-variant mb-1">Tag style</label><select data-bind="schedule.classes[' + i + '].beltStyle" class="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white"><option value="surface">Default</option><option value="primary">Primary</option><option value="tertiary">Tertiary</option></select>';
            html += field('Description', 'schedule.classes[' + i + '].description', 'textarea');
            html += field('Instructor name', 'schedule.classes[' + i + '].instructorName');
            html += field('Instructor subtitle', 'schedule.classes[' + i + '].instructorSubtitle');
            html += field('Instructor image URL (empty = groups icon)', 'schedule.classes[' + i + '].instructorImage', 'textarea');
            html +=
                '<label class="flex items-center gap-2 text-sm text-on-surface"><input type="checkbox" data-bind="schedule.classes[' + i + '].useGroupsIcon" class="rounded border-white/20" /> Use groups icon (open mat)</label>';
            html +=
                '<label class="block text-xs text-on-surface-variant mb-1">CTA</label><select data-bind="schedule.classes[' + i + '].cta" class="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white"><option value="book">Book Spot</option><option value="full">Fully Booked</option><option value="join">Join Session</option></select>';
            html += '</div>';
        });
        html += '</div></div>';
        root.innerHTML = html;
        bindInputs(root);
    }

    function field(label, path, type) {
        type = type || 'text';
        var base =
            '<label class="block text-xs font-medium text-on-surface-variant mb-1">' +
            escHtml(label) +
            '</label>';
        if (type === 'textarea') {
            return (
                base +
                '<textarea data-bind="' +
                path +
                '" rows="2" class="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 mb-3"></textarea>'
            );
        }
        return (
            base +
            '<input type="text" data-bind="' +
            path +
            '" class="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-3" />'
        );
    }

    function escHtml(s) {
        return window.CatchStore.escapeHtml(s);
    }

    function renderInstructors(root) {
        var ins = state.instructors;
        var html = '<div class="space-y-8 max-w-4xl">';
        html += field('Hero line 1', 'instructors.heroTitlePrefix');
        html += field('Hero accent word', 'instructors.heroTitleAccent');
        html += field('Hero line 2', 'instructors.heroTitleSuffix');
        html += field('Subtitle', 'instructors.heroSubtitle', 'textarea');
        html += '<h3 class="text-lg font-bold font-headline text-white pt-4">Guest card</h3>';
        html += field('Title', 'instructors.guestCard.title');
        html += field('Body', 'instructors.guestCard.body', 'textarea');
        html += field('Button', 'instructors.guestCard.buttonLabel');
        html += '<h3 class="text-lg font-bold font-headline text-white pt-4">Instructors</h3>';
        ins.list.forEach(function (row, i) {
            html += '<div class="p-4 rounded-xl bg-surface-container-low ghost-border mb-4 space-y-3">';
            html += '<p class="text-xs font-bold text-primary uppercase">Instructor ' + (i + 1) + '</p>';
            html += field('Name', 'instructors.list[' + i + '].name');
            html += field('Role', 'instructors.list[' + i + '].role');
            html += field('Specialty', 'instructors.list[' + i + '].specialty', 'textarea');
            html += field('Belt / tag line', 'instructors.list[' + i + '].belt');
            html +=
                '<label class="block text-xs text-on-surface-variant mb-1">Tag style</label><select data-bind="instructors.list[' + i + '].tag" class="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white"><option value="">Default</option><option value="highlight">Highlight (blue)</option></select>';
            html += field('Photo URL', 'instructors.list[' + i + '].image', 'textarea');
            html += '</div>';
        });
        html += '</div>';
        root.innerHTML = html;
        bindInputs(root);
    }

    function renderTechniques(root) {
        var t = state.techniques;
        var html = '<div class="space-y-8 max-w-4xl">';
        html += field('Hero subtitle', 'techniques.heroSubtitle', 'textarea');
        html += field('Continue section title', 'techniques.continueSectionTitle');
        html += field('Continue active label', 'techniques.continueActiveLabel');
        html += '<h3 class="text-lg font-bold font-headline text-white">Continue watching cards</h3>';
        t.continue.forEach(function (b, i) {
            html += '<div class="p-4 rounded-xl bg-surface-container-low ghost-border mb-4 space-y-3">';
            html += '<p class="text-xs font-bold text-primary uppercase">Card ' + (i + 1) + '</p>';
            html += field('Badge', 'techniques.continue[' + i + '].badge');
            html +=
                '<label class="block text-xs text-on-surface-variant mb-1">Badge style</label><select data-bind="techniques.continue[' + i + '].badgeStyle" class="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white"><option value="primary">Primary</option><option value="muted">Muted</option></select>';
            html += field('Category', 'techniques.continue[' + i + '].category');
            html += field('Title before', 'techniques.continue[' + i + '].titleBefore');
            html += field('Highlight', 'techniques.continue[' + i + '].titleHighlight');
            html += field('Title after', 'techniques.continue[' + i + '].titleAfter');
            html += field('Duration line', 'techniques.continue[' + i + '].durationLine');
            html += field('Instructor', 'techniques.continue[' + i + '].instructorName');
            html += field('Image URL', 'techniques.continue[' + i + '].instructorImage', 'textarea');
            html += '</div>';
        });
        html += '<h3 class="text-lg font-bold font-headline text-white">Library promo card</h3>';
        html += field('Title', 'techniques.libraryCard.title');
        html += field('Body', 'techniques.libraryCard.body', 'textarea');
        html += field('Button', 'techniques.libraryCard.buttonLabel');
        html += field('Video list header (use {count})', 'techniques.listHeaderTemplate');
        html += '<h3 class="text-lg font-bold font-headline text-white">Category chips</h3>';
        t.categories.forEach(function (c, i) {
            html += '<div class="grid md:grid-cols-3 gap-3 mb-3 p-3 rounded-lg bg-surface-container-low/50">';
            html += field('Line 1', 'techniques.categories[' + i + '].line1');
            html += field('Line 2', 'techniques.categories[' + i + '].line2');
            html +=
                '<label class="flex items-center gap-2 text-sm text-on-surface"><input type="checkbox" data-bind="techniques.categories[' + i + '].active" class="rounded border-white/20" /> Active</label>';
            html +=
                '<label class="flex items-center gap-2 text-sm text-on-surface"><input type="checkbox" data-bind="techniques.categories[' + i + '].dimmed" class="rounded border-white/20" /> Dimmed</label>';
            html += '</div>';
        });
        html += '<h3 class="text-lg font-bold font-headline text-white">Video rows</h3>';
        html += '<p class="text-sm text-on-surface-variant mb-4">CTA: watch, members (locked).</p>';
        t.videos.forEach(function (v, i) {
            html += '<div class="p-4 rounded-xl bg-surface-container-low ghost-border mb-4 space-y-3">';
            html += '<p class="text-xs font-bold text-primary uppercase">Video ' + (i + 1) + '</p>';
            html += field('Duration number', 'techniques.videos[' + i + '].duration');
            html += field('Duration label', 'techniques.videos[' + i + '].durationLabel');
            html += field('Title', 'techniques.videos[' + i + '].title');
            html += field('Belt tag', 'techniques.videos[' + i + '].beltTag');
            html +=
                '<label class="block text-xs text-on-surface-variant mb-1">Tag style</label><select data-bind="techniques.videos[' + i + '].beltStyle" class="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white"><option value="surface">Default</option><option value="primary">Primary</option><option value="tertiary">Tertiary</option></select>';
            html += field('Description', 'techniques.videos[' + i + '].description', 'textarea');
            html += field('Instructor name', 'techniques.videos[' + i + '].instructorName');
            html += field('Instructor subtitle', 'techniques.videos[' + i + '].instructorSubtitle');
            html += field('Image URL', 'techniques.videos[' + i + '].instructorImage', 'textarea');
            html +=
                '<label class="flex items-center gap-2 text-sm text-on-surface"><input type="checkbox" data-bind="techniques.videos[' + i + '].useGroupsIcon" class="rounded border-white/20" /> Groups icon</label>';
            html +=
                '<label class="block text-xs text-on-surface-variant mb-1">CTA</label><select data-bind="techniques.videos[' + i + '].cta" class="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white"><option value="watch">Watch</option><option value="members">Members only</option></select>';
            html += '</div>';
        });
        html += '</div>';
        root.innerHTML = html;
        bindInputs(root);
    }

    function renderOverview(root) {
        var s = state.schedule.classes.length;
        var ins = state.instructors.list.length;
        var vid = state.techniques.videos.length;
        var remote =
            window.CatchStore.isRemoteConfigured && window.CatchStore.isRemoteConfigured()
                ? '<p class="text-on-surface-variant">Public pages load content from <strong class="text-white">Supabase</strong> when <code class="text-primary text-xs">js/supabase-config.js</code> is set. <strong class="text-white">Sign in</strong> here to save changes to the database. Your user must be listed in the <code class="text-xs">admin_users</code> table (run SQL in Supabase after your first signup).</p>'
                : '<p class="text-on-surface-variant">Set your Supabase URL and anon key in <code class="text-primary text-xs">js/supabase-config.js</code> so the site and admin read/write the same database. Until then, content uses <strong class="text-white">localStorage</strong> in this browser.</p>';
        root.innerHTML =
            '<div class="max-w-2xl space-y-6">' +
            remote +
            '<div class="grid sm:grid-cols-3 gap-4">' +
            cardStat('Schedule classes', s) +
            cardStat('Instructors', ins) +
            cardStat('Library videos', vid) +
            '</div>' +
            '<ul class="text-sm text-on-surface-variant space-y-2 list-disc pl-5">' +
            '<li>Open <a class="text-primary underline" href="schedule.html">Schedule</a>, <a class="text-primary underline" href="techniques.html">Technique Library</a>, and <a class="text-primary underline" href="instructors.html">Instructors</a> in another tab after saving.</li>' +
            '<li>Use <strong>Export JSON</strong> as a backup.</li>' +
            '</ul></div>';
    }

    function cardStat(label, n) {
        return (
            '<div class="rounded-xl bg-surface-container-low ghost-border p-5">' +
            '<p class="text-3xl font-black font-headline text-primary">' +
            n +
            '</p>' +
            '<p class="text-xs uppercase tracking-widest text-on-surface-variant mt-1">' +
            escHtml(label) +
            '</p></div>'
        );
    }

    function renderData(root) {
        root.innerHTML =
            '<div class="max-w-3xl space-y-4">' +
            '<p class="text-sm text-on-surface-variant">Download a backup or paste a previously exported file to restore.</p>' +
            '<div class="flex flex-wrap gap-3">' +
            '<button type="button" id="btn-export" class="bg-primary-container text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide">Export JSON</button>' +
            '<button type="button" id="btn-import" class="bg-surface-container-high text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide">Import JSON</button>' +
            '<button type="button" id="btn-reset" class="border border-error/50 text-error px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide">Reset defaults</button>' +
            '</div></div>';
        $('#btn-export', root).addEventListener('click', exportData);
        $('#btn-import', root).addEventListener('click', importData);
        $('#btn-reset', root).addEventListener('click', resetDefaults);
    }

    var activeTab = 'overview';

    function renderAuthSlot() {
        var slot = $('#admin-auth-slot');
        if (!slot || !window.CatchStore) return;
        if (!window.CatchStore.isRemoteConfigured || !window.CatchStore.isRemoteConfigured()) {
            slot.innerHTML =
                '<span class="text-xs text-on-surface-variant max-w-md">DB: local · edit <code class="text-primary">js/supabase-config.js</code></span>';
            return;
        }
        var client = window.CatchStore.getSupabaseClient && window.CatchStore.getSupabaseClient();
        if (!client) {
            slot.innerHTML = '<span class="text-xs text-amber-400">Supabase failed to initialize.</span>';
            return;
        }
        client.auth.getSession().then(function (res) {
            var session = res.data && res.data.session;
            if (session && session.user) {
                slot.innerHTML =
                    '<span class="text-xs text-on-surface-variant truncate max-w-[220px]" title="' +
                    escHtml(session.user.email || '') +
                    '">' +
                    escHtml(session.user.email || session.user.id) +
                    '</span>' +
                    '<button type="button" id="btn-admin-signout" class="text-xs font-bold uppercase tracking-wide text-primary border border-primary/40 px-3 py-1.5 rounded-lg hover:bg-primary/10">Sign out</button>';
                var so = $('#btn-admin-signout');
                if (so)
                    so.addEventListener('click', function () {
                        client.auth.signOut().then(function () {
                            renderAuthSlot();
                            showToast('Signed out.');
                        });
                    });
            } else {
                slot.innerHTML =
                    '<input type="email" id="admin-email" autocomplete="username" placeholder="Email" class="bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white w-40 max-w-[40vw]" />' +
                    '<input type="password" id="admin-password" autocomplete="current-password" placeholder="Password" class="bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-white w-36 max-w-[36vw]" />' +
                    '<button type="button" id="btn-admin-signin" class="text-xs font-bold uppercase tracking-wide bg-primary-container text-white px-4 py-2 rounded-lg">Sign in</button>';
                var si = $('#btn-admin-signin');
                if (si)
                    si.addEventListener('click', function () {
                        var em = $('#admin-email');
                        var pw = $('#admin-password');
                        if (!em || !pw) return;
                        client.auth
                            .signInWithPassword({ email: em.value.trim(), password: pw.value })
                            .then(function (r) {
                                if (r.error) {
                                    showToast(r.error.message, true);
                                    return;
                                }
                                renderAuthSlot();
                                showToast('Signed in.');
                            });
                    });
            }
        });
    }

    function bindAuthListener() {
        var c = window.CatchStore.getSupabaseClient && window.CatchStore.getSupabaseClient();
        if (!c || !c.auth || !c.auth.onAuthStateChange) return;
        c.auth.onAuthStateChange(function () {
            renderAuthSlot();
        });
    }

    function renderPanel() {
        var root = $('#admin-main');
        if (!root) return;

        var tabs = ['overview', 'schedule', 'instructors', 'techniques', 'data'];
        var navHtml = tabs
            .map(function (t) {
                var active = t === activeTab ? 'bg-[#3054ff]/20 text-[#bac3ff] border border-[#3054ff]/40' : 'text-on-surface-variant hover:bg-white/5';
                return (
                    '<button type="button" data-tab="' +
                    t +
                    '" class="w-full text-left px-4 py-3 rounded-xl text-sm font-bold font-headline capitalize transition-colors ' +
                    active +
                    '">' +
                    t +
                    '</button>'
                );
            })
            .join('');

        $('#admin-sidebar-nav').innerHTML = navHtml;
        $('#admin-sidebar-nav').querySelectorAll('[data-tab]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeTab = btn.getAttribute('data-tab');
                render();
            });
        });

        root.innerHTML = '<div id="admin-tab-panel"></div>';
        var panel = $('#admin-tab-panel');
        if (activeTab === 'overview') renderOverview(panel);
        else if (activeTab === 'schedule') renderSchedule(panel);
        else if (activeTab === 'instructors') renderInstructors(panel);
        else if (activeTab === 'techniques') renderTechniques(panel);
        else if (activeTab === 'data') renderData(panel);
    }

    function render() {
        if (!window.CatchStore) return;
        if (window.CatchStore.loadAsync) {
            window.CatchStore.loadAsync().then(function (data) {
                state = data;
                renderPanel();
            });
        } else {
            state = window.CatchStore.load();
            renderPanel();
        }
    }

    function init() {
        if (!window.CatchStore) return;
        $('#btn-save-all').addEventListener('click', save);
        renderAuthSlot();
        bindAuthListener();
        render();
    }

    window.AdminApp = { init: init, render: render, save: save };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
