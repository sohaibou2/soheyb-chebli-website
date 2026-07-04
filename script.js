// 1. إخفاء شاشة التحميل (Preloader) بعد اكتمال تحميل الصفحة
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // يختفي بسلاسة بعد نصف ثانية
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 2. القائمة المتجاوبة للموبايل (Hamburger Menu)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // غلق القائمة تلقائياً عند الضغط على أي رابط للتنقل
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. شريط تقدم القراءة الفوقي (Scroll Progress Bar)
    window.addEventListener('scroll', () => {
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (totalHeight > 0) {
                const progress = (window.pageYOffset / totalHeight) * 100;
                scrollProgress.style.width = `${progress}%`;
            }
        }
    });

    // 4. تفعيل تأثيرات الظهور عند التمرير (Animate on Scroll)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // يشتغل التأثير لما يظهر 15% من العنصر
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // إضافة كلاس السطوع والظهور
                observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور الأول لزيادة الأداء
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 5. التحكم في الأسئلة الشائعة (FAQ Accordion)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // غلق أي سؤال آخر مفتوح حالياً لتركيز الزائر
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // فتح أو غلق السؤال الحالي
                item.classList.toggle('active');
            });
        }
    });

    // 6. تحديث الرابط النشط في الـ Navbar تلقائياً أثناء التمرير
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // التحقق من مكان التمرير الحالي مقارنة بموقع القسم
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});
