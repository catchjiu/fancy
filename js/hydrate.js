(function () {
    var esc = window.CatchStore.escapeHtml;

    function beltClass(style) {
        if (style === 'primary') return 'bg-primary-container/20 text-primary-fixed-dim text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter';
        if (style === 'tertiary') return 'bg-tertiary-container text-on-tertiary-container text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter';
        return 'bg-surface-container-highest text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter';
    }

    function scheduleCtaButton(cta) {
        if (cta === 'full') {
            return '<button type="button" class="bg-surface-container-highest text-on-surface-variant font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-widest cursor-not-allowed opacity-50" disabled>Fully Booked</button>';
        }
        var label = cta === 'join' ? 'Join Session' : 'Book Spot';
        return '<button type="button" class="bg-primary-container hover:bg-inverse-primary text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-container/20">' + esc(label) + '</button>';
    }

    function techniqueCtaButton(cta) {
        if (cta === 'members') {
            return '<button type="button" class="bg-surface-container-highest text-on-surface-variant font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-widest cursor-not-allowed opacity-50" disabled>Members only</button>';
        }
        return '<button type="button" class="bg-primary-container hover:bg-inverse-primary text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-container/20">Watch</button>';
    }

    function instructorBlock(c) {
        if (c.useGroupsIcon) {
            return (
                '<div class="w-10 h-10 rounded-full overflow-hidden border border-white/5 flex items-center justify-center bg-surface-container-highest">' +
                '<span class="material-symbols-outlined text-on-surface-variant">groups</span></div>' +
                '<div><p class="text-xs font-bold leading-none">' +
                esc(c.instructorName) +
                '</p><p class="text-[10px] text-on-surface-variant italic font-accent">' +
                esc(c.instructorSubtitle) +
                '</p></div>'
            );
        }
        return (
            '<div class="w-10 h-10 rounded-full overflow-hidden border border-white/5">' +
            '<img class="w-full h-full object-cover" alt="" src="' +
            esc(c.instructorImage) +
            '"></div>' +
            '<div><p class="text-xs font-bold leading-none">' +
            esc(c.instructorName) +
            '</p><p class="text-[10px] text-on-surface-variant italic font-accent">' +
            esc(c.instructorSubtitle) +
            '</p></div>'
        );
    }

    function bookedBadgeClass(style) {
        if (style === 'muted') return 'bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase';
        return 'bg-primary-container/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase';
    }

    function renderBookedCard(b, cancelLabel) {
        cancelLabel = cancelLabel || 'Cancel';
        var title =
            esc(b.titleBefore) +
            '<span class="text-primary">' +
            esc(b.titleHighlight) +
            '</span>' +
            esc(b.titleAfter);
        var timeIcon = cancelLabel === 'Remove' ? 'play_circle' : 'schedule';
        return (
            '<div class="bg-surface-container-low rounded-xl p-6 ghost-border relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">' +
            '<div class="absolute top-0 right-0 p-4"><span class="' +
            bookedBadgeClass(b.badgeStyle) +
            '">' +
            esc(b.badge) +
            '</span></div>' +
            '<div class="flex flex-col h-full justify-between"><div>' +
            '<p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">' +
            esc(b.category) +
            '</p>' +
            '<h3 class="text-2xl font-bold font-headline mb-4">' +
            title +
            '</h3>' +
            '<div class="flex items-center gap-2 mb-4">' +
            '<span class="material-symbols-outlined text-primary text-sm">' +
            timeIcon +
            '</span>' +
            '<span class="text-sm text-on-surface">' +
            esc(b.time || b.durationLine) +
            '</span></div></div>' +
            '<div class="flex items-center justify-between mt-4 pt-4 border-t border-white/5">' +
            '<div class="flex items-center gap-2">' +
            '<div class="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest border border-primary/20">' +
            '<img class="w-full h-full object-cover" alt="" src="' +
            esc(b.instructorImage) +
            '"></div>' +
            '<span class="text-xs font-medium text-on-surface-variant">' +
            esc(b.instructorName) +
            '</span></div>' +
            '<button type="button" class="text-[10px] uppercase font-bold text-error hover:underline transition-all">' +
            esc(cancelLabel) +
            '</button></div></div></div>'
        );
    }

    function renderCreditsCard(card) {
        return (
            '<div class="bg-primary-container rounded-xl p-6 flex flex-col justify-between items-start kinetic-glow">' +
            '<span class="material-symbols-outlined text-white text-3xl">fitness_center</span><div>' +
            '<h3 class="text-2xl font-bold text-white font-headline leading-tight mb-2">' +
            esc(card.title).replace(/\n/g, '<br>') +
            '</h3>' +
            '<p class="text-white/70 text-sm mb-4">' +
            esc(card.body) +
            '</p>' +
            '<button type="button" class="bg-white text-primary-container px-4 py-2 rounded-xl font-bold text-sm hover:bg-neutral-100 transition-colors uppercase tracking-tight">' +
            esc(card.buttonLabel) +
            '</button></div></div>'
        );
    }

    function renderCalendar(days) {
        return days
            .map(function (d) {
                var active = d.active ? 'bg-primary-container text-white shadow-[0_0_20px_rgba(48,84,255,0.4)]' : 'bg-surface-container-low text-on-surface-variant ghost-border hover:bg-surface-container';
                var dim = d.dimmed ? ' opacity-50' : '';
                var numCls = d.active ? '' : ' text-on-surface';
                return (
                    '<button type="button" class="flex-shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-2xl ' +
                    active +
                    ' transition-all duration-300' +
                    dim +
                    '">' +
                    '<span class="text-[10px] font-bold uppercase tracking-widest mb-1">' +
                    esc(d.label) +
                    '</span>' +
                    '<span class="text-2xl font-black font-headline' +
                    numCls +
                    '">' +
                    esc(d.day) +
                    '</span></button>'
                );
            })
            .join('');
    }

    function renderScheduleClassRow(c) {
        return (
            '<div class="bg-surface-container-low hover:bg-surface-container-high transition-colors p-6 rounded-xl ghost-border flex flex-col md:flex-row md:items-center justify-between gap-6 group">' +
            '<div class="flex items-start gap-6">' +
            '<div class="text-center min-w-[80px]">' +
            '<p class="text-xl font-black font-headline text-primary">' +
            esc(c.time) +
            '</p>' +
            '<p class="text-[10px] text-on-surface-variant font-bold uppercase">' +
            esc(c.timeLabel) +
            '</p></div>' +
            '<div class="flex flex-col gap-1">' +
            '<div class="flex items-center gap-3 flex-wrap">' +
            '<h4 class="text-lg font-bold font-headline group-hover:text-primary transition-colors">' +
            esc(c.title) +
            '</h4>' +
            '<span class="' +
            beltClass(c.beltStyle || 'surface') +
            '">' +
            esc(c.beltTag) +
            '</span></div>' +
            '<p class="text-sm text-on-surface-variant">' +
            esc(c.description) +
            '</p></div></div>' +
            '<div class="flex items-center justify-between md:justify-end gap-8">' +
            '<div class="flex items-center gap-3">' +
            instructorBlock(c) +
            '</div>' +
            scheduleCtaButton(c.cta) +
            '</div></div>'
        );
    }

    function renderTechniqueVideoRow(c) {
        return (
            '<div class="bg-surface-container-low hover:bg-surface-container-high transition-colors p-6 rounded-xl ghost-border flex flex-col md:flex-row md:items-center justify-between gap-6 group">' +
            '<div class="flex items-start gap-6">' +
            '<div class="text-center min-w-[80px]">' +
            '<p class="text-xl font-black font-headline text-primary">' +
            esc(c.duration) +
            '</p>' +
            '<p class="text-[10px] text-on-surface-variant font-bold uppercase">' +
            esc(c.durationLabel || 'min') +
            '</p></div>' +
            '<div class="flex flex-col gap-1">' +
            '<div class="flex items-center gap-3 flex-wrap">' +
            '<h4 class="text-lg font-bold font-headline group-hover:text-primary transition-colors">' +
            esc(c.title) +
            '</h4>' +
            '<span class="' +
            beltClass(c.beltStyle || 'surface') +
            '">' +
            esc(c.beltTag) +
            '</span></div>' +
            '<p class="text-sm text-on-surface-variant">' +
            esc(c.description) +
            '</p></div></div>' +
            '<div class="flex items-center justify-between md:justify-end gap-8">' +
            '<div class="flex items-center gap-3">' +
            instructorBlock(c) +
            '</div>' +
            techniqueCtaButton(c.cta) +
            '</div></div>'
        );
    }

    function renderCategories(cats) {
        return cats
            .map(function (d) {
                var active = d.active ? 'bg-primary-container text-white shadow-[0_0_20px_rgba(48,84,255,0.4)]' : 'bg-surface-container-low text-on-surface-variant ghost-border hover:bg-surface-container';
                var dim = d.dimmed ? ' opacity-50' : '';
                var t2 = d.active ? '' : ' text-on-surface';
                return (
                    '<button type="button" class="flex-shrink-0 flex flex-col items-center justify-center min-w-[5rem] h-24 px-2 rounded-2xl ' +
                    active +
                    ' transition-all duration-300' +
                    dim +
                    '">' +
                    '<span class="text-[10px] font-bold uppercase tracking-widest mb-1">' +
                    esc(d.line1) +
                    '</span>' +
                    '<span class="text-lg font-black font-headline leading-tight text-center' +
                    t2 +
                    '">' +
                    esc(d.line2) +
                    '</span></button>'
                );
            })
            .join('');
    }

    function renderInstructorCard(inst, guest) {
        var beltSpan =
            inst.tag === 'highlight'
                ? '<span class="inline-block text-[10px] font-bold uppercase tracking-tighter bg-primary-container/20 text-primary px-2 py-1 rounded-full">' +
                  esc(inst.belt) +
                  '</span>'
                : '<span class="inline-block text-[10px] font-bold uppercase tracking-tighter bg-surface-container-highest px-2 py-1 rounded-full text-on-surface-variant">' +
                  esc(inst.belt) +
                  '</span>';
        return (
            '<article class="bg-surface-container-low rounded-xl overflow-hidden ghost-border group hover:bg-surface-container-high transition-colors">' +
            '<div class="aspect-[4/3] overflow-hidden bg-surface-container-highest">' +
            '<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" src="' +
            esc(inst.image) +
            '"></div>' +
            '<div class="p-6">' +
            '<p class="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">' +
            esc(inst.role) +
            '</p>' +
            '<h2 class="text-xl font-bold font-headline text-white mb-1">' +
            esc(inst.name) +
            '</h2>' +
            '<p class="text-sm text-on-surface-variant mb-3">' +
            esc(inst.specialty) +
            '</p>' +
            beltSpan +
            '</div></article>'
        );
    }

    function renderGuestCard(guest) {
        return (
            '<article class="bg-surface-container-low rounded-xl overflow-hidden ghost-border group hover:bg-surface-container-high transition-colors flex flex-col justify-center items-center p-8 text-center kinetic-glow border border-primary-container/30">' +
            '<span class="material-symbols-outlined text-primary text-4xl mb-4">person_add</span>' +
            '<h2 class="text-lg font-bold font-headline text-white mb-2">' +
            esc(guest.title) +
            '</h2>' +
            '<p class="text-sm text-on-surface-variant mb-4">' +
            esc(guest.body) +
            '</p>' +
            '<a href="schedule.html" class="inline-flex items-center justify-center bg-primary-container px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white hover:shadow-lg shadow-primary-container/20 transition-all">' +
            esc(guest.buttonLabel) +
            '</a></article>'
        );
    }

    function hydrateSchedule(data) {
        var s = data.schedule;
        var hero = document.getElementById('hydrate-schedule-hero');
        if (hero) hero.textContent = s.heroSubtitle;

        var hBookedTitle = document.getElementById('hydrate-booked-section-title');
        if (hBookedTitle) hBookedTitle.textContent = s.bookedSectionTitle;
        var hBookedLabel = document.getElementById('hydrate-booked-active-label');
        if (hBookedLabel) hBookedLabel.textContent = s.bookedActiveLabel;

        var grid = document.getElementById('hydrate-booked-grid');
        if (grid && s.booked && s.creditsCard) {
            var html = '';
            s.booked.forEach(function (b) {
                html += renderBookedCard(b, 'Cancel');
            });
            html += renderCreditsCard(s.creditsCard);
            grid.innerHTML = html;
        }

        var cal = document.getElementById('hydrate-calendar');
        if (cal && s.calendarDays) cal.innerHTML = renderCalendar(s.calendarDays);

        var listHeader = document.getElementById('hydrate-list-header');
        if (listHeader && s.classes) {
            var t = s.listHeaderTemplate || 'All Levels ({count} Classes Available)';
            listHeader.textContent = t.replace('{count}', String(s.classes.length));
        }

        var list = document.getElementById('hydrate-class-list');
        if (list && s.classes) {
            list.innerHTML = s.classes.map(renderScheduleClassRow).join('');
        }
    }

    function hydrateTechniques(data) {
        var t = data.techniques;
        var hero = document.getElementById('hydrate-techniques-hero');
        if (hero) hero.textContent = t.heroSubtitle;

        var ct = document.getElementById('hydrate-continue-title');
        if (ct) ct.textContent = t.continueSectionTitle;
        var ca = document.getElementById('hydrate-continue-active');
        if (ca) ca.textContent = t.continueActiveLabel;

        var grid = document.getElementById('hydrate-continue-grid');
        if (grid && t.continue && t.libraryCard) {
            var html = '';
            t.continue.forEach(function (b) {
                html += renderBookedCard(b, 'Remove');
            });
            html += renderCreditsCard(t.libraryCard);
            grid.innerHTML = html;
        }

        var cats = document.getElementById('hydrate-categories');
        if (cats && t.categories) cats.innerHTML = renderCategories(t.categories);

        var lh = document.getElementById('hydrate-techniques-list-header');
        if (lh && t.videos) {
            var tmpl = t.listHeaderTemplate || 'All levels · {count} videos in this list';
            lh.textContent = tmpl.replace('{count}', String(t.videos.length));
        }

        var vl = document.getElementById('hydrate-video-list');
        if (vl && t.videos) {
            vl.innerHTML = t.videos.map(renderTechniqueVideoRow).join('');
        }
    }

    function hydrateInstructors(data) {
        var ins = data.instructors;
        var ht = document.getElementById('hydrate-instructors-hero-title');
        if (ht) {
            var pre = ins.heroTitlePrefix != null ? ins.heroTitlePrefix : 'The';
            var ac = ins.heroTitleAccent != null ? ins.heroTitleAccent : 'Coaching';
            var suf = ins.heroTitleSuffix != null ? ins.heroTitleSuffix : 'Staff';
            ht.innerHTML =
                esc(pre) +
                ' <span class="font-accent italic lowercase text-primary">' +
                esc(ac) +
                '</span> ' +
                esc(suf);
        }
        var hs = document.getElementById('hydrate-instructors-hero-sub');
        if (hs) hs.textContent = ins.heroSubtitle;

        var grid = document.getElementById('hydrate-instructor-grid');
        if (grid && ins.list) {
            var html = ins.list.map(function (i) {
                return renderInstructorCard(i, ins.guestCard);
            });
            html.push(renderGuestCard(ins.guestCard));
            grid.innerHTML = html.join('');
        }
    }

    function applyPage(data) {
        var page = document.body && document.body.getAttribute('data-page');
        if (page === 'schedule') hydrateSchedule(data);
        else if (page === 'techniques') hydrateTechniques(data);
        else if (page === 'instructors') hydrateInstructors(data);
    }

    function run() {
        if (!window.CatchStore) return;
        if (window.CatchStore.loadAsync) {
            window.CatchStore.loadAsync().then(applyPage).catch(function () {
                applyPage(window.CatchStore.load());
            });
        } else {
            applyPage(window.CatchStore.load());
        }
    }

    window.CatchHydrate = { run: run };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
