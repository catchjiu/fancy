(function (global) {
    var STORAGE_KEY = 'catch_academy_data_v1';

    function escapeHtml(s) {
        if (s == null || s === undefined) return '';
        var d = document.createElement('div');
        d.textContent = String(s);
        return d.innerHTML;
    }

    function defaultData() {
        return {
            version: 1,
            schedule: {
                heroSubtitle: 'Precision and power. Reserve your place on the mats for upcoming sessions.',
                bookedSectionTitle: 'My Booked Classes',
                bookedActiveLabel: 'Active 2 Sessions',
                booked: [
                    {
                        badge: 'Today',
                        badgeStyle: 'primary',
                        category: 'Advanced Gi',
                        titleBefore: 'Mastering the ',
                        titleHighlight: 'Berimbolo',
                        titleAfter: '',
                        time: '6:00 PM - 7:30 PM',
                        instructorName: 'Lucas Ribeiro',
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeD-5ZXMSAiRwSUd3fivUgJ8GYJKwMZMbh2F1o_xFUsaT1fScvu0ZH4KfuKMMabDqM5dcbd_KhOtaZAE-vZ-m2e1btwnPUlKjQ8bGi7x6N0wFmaGQzmJn5flagcN1Vg-GWXoRZccsI9xdZ8IMWP_of0OQajt69jGTM6j2U8DhLlJ4cxafU9U0R6iGj37Zgrg1uhtUrzJ5UxZLnobYxl3hQG8VqIHBcf5HE9BTIFcFvNX3wFJvvgEwfPS9TD8Pi5Zvf1jwMFHiPZKU'
                    },
                    {
                        badge: 'Tomorrow',
                        badgeStyle: 'muted',
                        category: 'No-Gi Fundamental',
                        titleBefore: 'Pressure ',
                        titleHighlight: 'Passing',
                        titleAfter: '',
                        time: '12:00 PM - 1:30 PM',
                        instructorName: 'Sarah Chen',
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuGOebyLzApv-qspejlM3pPMFPTzIrJcm9RsrgOAiPEN148waeqi3xG1qEYZ1YUlkK0kEOyDVeyrd3P12eY54cHzFJcAwgylyuoqm1im5lmVBfSY-GrhTjaFz1L2B275WRWna7O2qgR56jOXZ66mZ3JDjJq1nv9VPnx69IVo0k1dAD5BLYuDBGFWtpuLlT-a_cDhFZvUbz3BqDbhCcQLnm4mwjbAcM7mqPYFiWj3HBmmAaZH-6gbszefCYGUlF_iJHJquwPyUo4Pk'
                    }
                ],
                creditsCard: {
                    title: 'Ready to Go Beyond?',
                    body: 'You have 12 credits remaining this month.',
                    buttonLabel: 'Upgrade Plan'
                },
                calendarDays: [
                    { label: 'Mon', day: '22', active: true, dimmed: false },
                    { label: 'Tue', day: '23', active: false, dimmed: false },
                    { label: 'Wed', day: '24', active: false, dimmed: false },
                    { label: 'Thu', day: '25', active: false, dimmed: false },
                    { label: 'Fri', day: '26', active: false, dimmed: false },
                    { label: 'Sat', day: '27', active: false, dimmed: true },
                    { label: 'Sun', day: '28', active: false, dimmed: true }
                ],
                listHeaderTemplate: 'All Levels ({count} Classes Available)',
                classes: [
                    {
                        time: '06:00',
                        timeLabel: 'AM Session',
                        title: 'Early Morning Fundamentals',
                        beltTag: 'White Belt',
                        beltStyle: 'surface',
                        description: 'Mat 1 • Escape Mechanics & Framing',
                        instructorName: 'Marcus Thorne',
                        instructorSubtitle: 'Black Belt 2nd Degree',
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc7y-AsTV_uriPrsD6TUGQT6NHGmUHeDPy3A9KQPayIm_I2mgjcHHa5hM11GMljBGojDYJ6AY2ky-xLEwtICsdL2Dxry6ztMi89giCT7ovzEbaQRTdBSPS5SeM-aXqRgJ-5bqzpBjmc66BlUGXj4vs0xfzgWoQUtrvDtMrF-HHhwFEMe8JabU6JDcKf3JN1JRvJwjxxuRt8srmwNEDwEzpybeZ6YQmWzf-_wx9dBZ_oyfFvmBSI9qm34YBL6HFgUmkwAHurhAxfX8',
                        cta: 'book'
                    },
                    {
                        time: '05:00',
                        timeLabel: 'PM Session',
                        title: 'Competition Lab: No-Gi',
                        beltTag: 'Pro Only',
                        beltStyle: 'primary',
                        description: 'Mat 2 • High Pace Rolling & Scrambles',
                        instructorName: 'Elena Volkov',
                        instructorSubtitle: "World Champion '22",
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMLFQ7v02anby6CaArSVA6AnvulAWokyXYjrcVYh5EAZcJe3qpFbRyOl9dntpl9CXTVET2vwveCfEMAxj6hjN9KHzq_Be1G26ig63yBneVcm8dxWmv6ep0gQaK3TyR4XkDl4MGTWXSCp1VvxzJd3eP5mOxM-jzd9lY4jPrCuMKWlb7wtjF55kvHX7mKznZ_mFB6LBDd2TiOzhgQB8QKr0YJ1qgshxTOWwHLadFYZawYJgjtVWggnV3X8Jc-QMox5lsQSE3TYwvGlk',
                        cta: 'full'
                    },
                    {
                        time: '07:30',
                        timeLabel: 'PM Session',
                        title: 'Leg Lock Seminar',
                        beltTag: 'All Levels',
                        beltStyle: 'tertiary',
                        description: 'Mat 1 • Heel Hooks & SLX Entries',
                        instructorName: 'David Kim',
                        instructorSubtitle: 'Black Belt 3rd Degree',
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzOnDrl2TU9O6d31P5eftoV_gUVEBtTFEsb4I_DrXJBD3e5In9belJvsDSfWT3u66JcA-rlkeX23wPZN3sFNGOD2UHu2YhUwMColezOXkujBjIDWEk4vu1twEvruQpLD9al2QT7dIYxTQO4NHUqxJ-KUjpRef99axJ1v0A25B_xzS-U4ksDcbrXC36Gp4HokzDAS4mKIXhf-iIbbKwJbkdhvccVVmnjF4q2jvXCk0HyXeuMCHWbWuUXM21XNctURAxRTj74-rqeU',
                        cta: 'book'
                    },
                    {
                        time: '08:45',
                        timeLabel: 'Late Session',
                        title: 'Open Mat',
                        beltTag: 'All Levels',
                        beltStyle: 'surface',
                        description: 'Main Floor • Self-paced Training',
                        instructorName: 'Staff Managed',
                        instructorSubtitle: 'Supervised Session',
                        instructorImage: '',
                        useGroupsIcon: true,
                        cta: 'join'
                    }
                ]
            },
            techniques: {
                heroSubtitle: 'On-demand instruction, competition breakdowns, and drilling paths—stream anytime, anywhere.',
                continueSectionTitle: 'Continue Watching',
                continueActiveLabel: '2 in progress',
                continue: [
                    {
                        badge: 'In progress',
                        badgeStyle: 'primary',
                        category: 'Advanced Gi',
                        titleBefore: 'Mastering the ',
                        titleHighlight: 'Berimbolo',
                        titleAfter: '',
                        durationLine: '42 min remaining',
                        instructorName: 'Lucas Ribeiro',
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeD-5ZXMSAiRwSUd3fivUgJ8GYJKwMZMbh2F1o_xFUsaT1fScvu0ZH4KfuKMMabDqM5dcbd_KhOtaZAE-vZ-m2e1btwnPUlKjQ8bGi7x6N0wFmaGQzmJn5flagcN1Vg-GWXoRZccsI9xdZ8IMWP_of0OQajt69jGTM6j2U8DhLlJ4cxafU9U0R6iGj37Zgrg1uhtUrzJ5UxZLnobYxl3hQG8VqIHBcf5HE9BTIFcFvNX3wFJvvgEwfPS9TD8Pi5Zvf1jwMFHiPZKU'
                    },
                    {
                        badge: 'Queued',
                        badgeStyle: 'muted',
                        category: 'No-Gi Fundamental',
                        titleBefore: 'Pressure ',
                        titleHighlight: 'Passing',
                        titleAfter: '',
                        durationLine: '28 min total',
                        instructorName: 'Sarah Chen',
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuGOebyLzApv-qspejlM3pPMFPTzIrJcm9RsrgOAiPEN148waeqi3xG1qEYZ1YUlkK0kEOyDVeyrd3P12eY54cHzFJcAwgylyuoqm1im5lmVBfSY-GrhTjaFz1L2B275WRWna7O2qgR56jOXZ66mZ3JDjJq1nv9VPnx69IVo0k1dAD5BLYuDBGFWtpuLlT-a_cDhFZvUbz3BqDbhCcQLnm4mwjbAcM7mqPYFiWj3HBmmAaZH-6gbszefCYGUlF_iJHJquwPyUo4Pk'
                    }
                ],
                libraryCard: {
                    title: 'Unlock the full library',
                    body: '200+ techniques, seminars, and rolling labs.',
                    buttonLabel: 'View plans'
                },
                categories: [
                    { line1: 'Gi', line2: 'Fundamentals', active: true },
                    { line1: 'No-Gi', line2: 'Speed', active: false },
                    { line1: 'Leg', line2: 'Locks', active: false },
                    { line1: 'Comp', line2: 'Prep', active: false },
                    { line1: 'Kids', line2: 'Basics', active: false },
                    { line1: 'Open', line2: 'Mat', active: false, dimmed: true },
                    { line1: 'Soon', line2: 'More', active: false, dimmed: true }
                ],
                listHeaderTemplate: 'All levels · {count} videos in this list',
                videos: [
                    {
                        duration: '18',
                        durationLabel: 'min',
                        title: 'Early Morning Fundamentals',
                        beltTag: 'White Belt',
                        beltStyle: 'surface',
                        description: 'Series 1 • Escape mechanics & framing',
                        instructorName: 'Marcus Thorne',
                        instructorSubtitle: 'Black Belt 2nd Degree',
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc7y-AsTV_uriPrsD6TUGQT6NHGmUHeDPy3A9KQPayIm_I2mgjcHHa5hM11GMljBGojDYJ6AY2ky-xLEwtICsdL2Dxry6ztMi89giCT7ovzEbaQRTdBSPS5SeM-aXqRgJ-5bqzpBjmc66BlUGXj4vs0xfzgWoQUtrvDtMrF-HHhwFEMe8JabU6JDcKf3JN1JRvJwjxxuRt8srmwNEDwEzpybeZ6YQmWzf-_wx9dBZ_oyfFvmBSI9qm34YBL6HFgUmkwAHurhAxfX8',
                        cta: 'watch'
                    },
                    {
                        duration: '54',
                        durationLabel: 'min',
                        title: 'Competition Lab: No-Gi',
                        beltTag: 'Pro Only',
                        beltStyle: 'primary',
                        description: 'Lab 2 • High pace rolling & scrambles',
                        instructorName: 'Elena Volkov',
                        instructorSubtitle: "World Champion '22",
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMLFQ7v02anby6CaArSVA6AnvulAWokyXYjrcVYh5EAZcJe3qpFbRyOl9dntpl9CXTVET2vwveCfEMAxj6hjN9KHzq_Be1G26ig63yBneVcm8dxWmv6ep0gQaK3TyR4XkDl4MGTWXSCp1VvxzJd3eP5mOxM-jzd9lY4jPrCuMKWlb7wtjF55kvHX7mKznZ_mFB6LBDd2TiOzhgQB8QKr0YJ1qgshxTOWwHLadFYZawYJgjtVWggnV3X8Jc-QMox5lsQSE3TYwvGlk',
                        cta: 'members'
                    },
                    {
                        duration: '41',
                        durationLabel: 'min',
                        title: 'Leg Lock Seminar',
                        beltTag: 'All Levels',
                        beltStyle: 'tertiary',
                        description: 'Seminar • Heel hooks & SLX entries',
                        instructorName: 'David Kim',
                        instructorSubtitle: 'Black Belt 3rd Degree',
                        instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzOnDrl2TU9O6d31P5eftoV_gUVEBtTFEsb4I_DrXJBD3e5In9belJvsDSfWT3u66JcA-rlkeX23wPZN3sFNGOD2UHu2YhUwMColezOXkujBjIDWEk4vu1twEvruQpLD9al2QT7dIYxTQO4NHUqxJ-KUjpRef99axJ1v0A25B_xzS-U4ksDcbrXC36Gp4HokzDAS4mKIXhf-iIbbKwJbkdhvccVVmnjF4q2jvXCk0HyXeuMCHWbWuUXM21XNctURAxRTj74-rqeU',
                        cta: 'watch'
                    },
                    {
                        duration: '90',
                        durationLabel: 'min',
                        title: 'Open Mat Archive',
                        beltTag: 'All Levels',
                        beltStyle: 'surface',
                        description: 'Main floor • Self-paced training highlights',
                        instructorName: 'Staff curated',
                        instructorSubtitle: 'Rolling compilation',
                        instructorImage: '',
                        useGroupsIcon: true,
                        cta: 'watch'
                    }
                ]
            },
            instructors: {
                heroTitlePrefix: 'The',
                heroTitleAccent: 'Coaching',
                heroTitleSuffix: 'Staff',
                heroSubtitle: 'Black belts, competitors, and educators—here to sharpen your game on and off the mats.',
                guestCard: {
                    title: 'Guest instructors',
                    body: 'Seminars and visiting coaches rotate monthly—check the schedule for the next drop-in.',
                    buttonLabel: 'View schedule'
                },
                list: [
                    {
                        name: 'Marcus Thorne',
                        role: 'Head coach',
                        specialty: 'Gi fundamentals, escapes & framing',
                        belt: 'Black Belt · 2nd degree',
                        tag: '',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc7y-AsTV_uriPrsD6TUGQT6NHGmUHeDPy3A9KQPayIm_I2mgjcHHa5hM11GMljBGojDYJ6AY2ky-xLEwtICsdL2Dxry6ztMi89giCT7ovzEbaQRTdBSPS5SeM-aXqRgJ-5bqzpBjmc66BlUGXj4vs0xfzgWoQUtrvDtMrF-HHhwFEMe8JabU6JDcKf3JN1JRvJwjxxuRt8srmwNEDwEzpybeZ6YQmWzf-_wx9dBZ_oyfFvmBSI9qm34YBL6HFgUmkwAHurhAxfX8'
                    },
                    {
                        name: 'Elena Volkov',
                        role: 'Competition',
                        specialty: 'No-gi scrambles, pace & transitions',
                        belt: "World champion '22",
                        tag: 'highlight',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMLFQ7v02anby6CaArSVA6AnvulAWokyXYjrcVYh5EAZcJe3qpFbRyOl9dntpl9CXTVET2vwveCfEMAxj6hjN9KHzq_Be1G26ig63yBneVcm8dxWmv6ep0gQaK3TyR4XkDl4MGTWXSCp1VvxzJd3eP5mOxM-jzd9lY4jPrCuMKWlb7wtjF55kvHX7mKznZ_mFB6LBDd2TiOzhgQB8QKr0YJ1qgshxTOWwHLadFYZawYJgjtVWggnV3X8Jc-QMox5lsQSE3TYwvGlk'
                    },
                    {
                        name: 'David Kim',
                        role: 'Leg attacks',
                        specialty: 'Heel hooks, SLX & inside sankaku',
                        belt: 'Black Belt · 3rd degree',
                        tag: '',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzOnDrl2TU9O6d31P5eftoV_gUVEBtTFEsb4I_DrXJBD3e5In9belJvsDSfWT3u66JcA-rlkeX23wPZN3sFNGOD2UHu2YhUwMColezOXkujBjIDWEk4vu1twEvruQpLD9al2QT7dIYxTQO4NHUqxJ-KUjpRef99axJ1v0A25B_xzS-U4ksDcbrXC36Gp4HokzDAS4mKIXhf-iIbbKwJbkdhvccVVmnjF4q2jvXCk0HyXeuMCHWbWuUXM21XNctURAxRTj74-rqeU'
                    },
                    {
                        name: 'Lucas Ribeiro',
                        role: 'Advanced gi',
                        specialty: 'Berimbolo & back takes',
                        belt: 'Black Belt',
                        tag: '',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeD-5ZXMSAiRwSUd3fivUgJ8GYJKwMZMbh2F1o_xFUsaT1fScvu0ZH4KfuKMMabDqM5dcbd_KhOtaZAE-vZ-m2e1btwnPUlKjQ8bGi7x6N0wFmaGQzmJn5flagcN1Vg-GWXoRZccsI9xdZ8IMWP_of0OQajt69jGTM6j2U8DhLlJ4cxafU9U0R6iGj37Zgrg1uhtUrzJ5UxZLnobYxl3hQG8VqIHBcf5HE9BTIFcFvNX3wFJvvgEwfPS9TD8Pi5Zvf1jwMFHiPZKU'
                    },
                    {
                        name: 'Sarah Chen',
                        role: 'Fundamentals',
                        specialty: 'Pressure passing & top control',
                        belt: 'Brown Belt',
                        tag: '',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuGOebyLzApv-qspejlM3pPMFPTzIrJcm9RsrgOAiPEN148waeqi3xG1qEYZ1YUlkK0kEOyDVeyrd3P12eY54cHzFJcAwgylyuoqm1im5lmVBfSY-GrhTjaFz1L2B275WRWna7O2qgR56jOXZ66mZ3JDjJq1nv9VPnx69IVo0k1dAD5BLYuDBGFWtpuLlT-a_cDhFZvUbz3BqDbhCcQLnm4mwjbAcM7mqPYFiWj3HBmmAaZH-6gbszefCYGUlF_iJHJquwPyUo4Pk'
                    }
                ]
            }
        };
    }

    function load() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return defaultData();
            var parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object') return defaultData();
            return mergeDeep(defaultData(), parsed);
        } catch (e) {
            return defaultData();
        }
    }

    function mergeDeep(base, patch) {
        if (!patch || typeof patch !== 'object') return base;
        var out = JSON.parse(JSON.stringify(base));
        function walk(a, b) {
            for (var k in b) {
                if (!Object.prototype.hasOwnProperty.call(b, k)) continue;
                if (b[k] !== null && typeof b[k] === 'object' && !Array.isArray(b[k]) && typeof a[k] === 'object' && a[k] !== null && !Array.isArray(a[k])) {
                    walk(a[k], b[k]);
                } else {
                    a[k] = b[k];
                }
            }
        }
        walk(out, patch);
        return out;
    }

    function save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            return false;
        }
    }

    function exportJson(data) {
        return JSON.stringify(data, null, 2);
    }

    function importJson(str) {
        var parsed = JSON.parse(str);
        var merged = mergeDeep(defaultData(), parsed);
        save(merged);
        return merged;
    }

    global.CatchStore = {
        STORAGE_KEY: STORAGE_KEY,
        defaultData: defaultData,
        load: load,
        save: save,
        escapeHtml: escapeHtml,
        exportJson: exportJson,
        importJson: importJson,
        mergeDeep: mergeDeep
    };
})(typeof window !== 'undefined' ? window : globalThis);
