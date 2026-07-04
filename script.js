document.addEventListener('DOMContentLoaded', () => {

    // 1. إخفاء شاشة التحميل (Preloader) بعد اكتمال تحميل عناصر الصفحة
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hide-loader');
        });
        // حماية احتياطية في حال تأخر تحميل الموارد الخارجية
        setTimeout(() => {
            preloader.classList.add('hide-loader');
        }, 2000);
    }

    // 2. التحكم في قائمة الهاتف المحمول (Hamburger Menu)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // إغلاق المنيو تلقائياً عند الضغط على أي رابط بداخلها لتسهيل التصفح
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. نظام الأسئلة الشائعة المرن (FAQ Accordion)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            
            // إغلاق أي سؤال آخر مفتوح حالياً لتنظيم العرض (ميزة اختيارية راقية)
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });

            // فتح أو غلق السؤال الذي تم الضغط عليه
            currentItem.classList.toggle('active');
        });
    });

    // 4. تحديد الرابط النشط تلقائياً أثناء التمرير (Active Link on Scroll)
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // مسافة أمان لتناسب الهيدر الثابت
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a[href*=' + sectionId + ']').forEach(el => {
                    if(el.classList.contains('nav-link')) {
                        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                        el.classList.add('active');
                    }
                });
            }
        });
    });
});
