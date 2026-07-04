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

    // القائمة المستجيبة للهواتف (Mobile Menu)
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("open");
            const spans = hamburger.querySelectorAll("span");
            if (hamburger.classList.contains("open")) {
                spans[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
            } else {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });
    }

    // غلق القائمة عند الضغط على أي رابط
    const navLinks = document.querySelectorAll("#nav-menu a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu && hamburger) {
                navMenu.classList.remove("active");
                hamburger.classList.remove("open");
                const spans = hamburger.querySelectorAll("span");
                if (spans.length >= 3) {
                    spans[0].style.transform = "none";
                    spans[1].style.opacity = "1";
                    spans[2].style.transform = "none";
                }
            }
        });
    });

    // تأثيرات ظهور العناصر عند النزول (Scroll Reveal)
    const revealElements = document.querySelectorAll(".scroll-reveal");
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("visible"));
    }

    // تغيير الرابط النشط تلقائياً أثناء النزول
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
        let currentSectionId = "hero";
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // أسئلة وأجوبة (FAQ Accordion)
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const header = item.querySelector(".faq-header");
        if (header) {
            header.addEventListener("click", () => {
                const alreadyActive = item.classList.contains("active");
                faqItems.forEach(i => i.classList.remove("active"));
                if (!alreadyActive) {
                    item.classList.add("active");
                }
            });
        }
    });
});
    // 4. Scroll Active Navigation Indicator
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 5. Scroll Animations via Intersection Observer API
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("appear");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });
    
    // Trigger initial check on load
    handleScrollAnimation();

    // 6. FAQ Accordion Toggle Interaction
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Close all active items first
            faqItems.forEach(i => i.classList.remove("active"));
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
});
