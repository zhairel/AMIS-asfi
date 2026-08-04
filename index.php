<?php
// ============================================================================
// ASFI - AMIS SADAQAH FAMILY INCORPORATED (DAVAO CITY 2026)
// Official Web Application & Launch Preview Portal
// Tagline: Empowering Communities Through Compassion and Mutual Support.
// Standalone Launch Page with Smooth Micro-Animations
// ============================================================================

// Strict HTTPS enforcement
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
    || (isset($_SERVER['HTTP_FRONT_END_HTTPS']) && $_SERVER['HTTP_FRONT_END_HTTPS'] === 'on');

if (!$isHttps && isset($_SERVER['HTTP_HOST'])) {
    $secureUrl = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $secureUrl);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>ASFI - AMIS Sadaqah Family Incorporated | 2026</title>
    <meta name="description" content="AMIS Sadaqah Family Incorporated (ASFI) - Empowering Communities Through Compassion and Mutual Support. Education Assistance, Medical Relief, Orphan Care & Takaful.">
    <meta name="keywords" content="ASFI, AMIS Sadaqah Family Incorporated, Sadaqah, Zakat, Takaful, Education Assistance, Medical Aid, Charity Philippines">
    <link rel="icon" type="image/png" href="asfi_logo_2026.png">

    <!-- Fonts & Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script src="https://unpkg.com/lucide@latest"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                        arabic: ['Amiri', 'serif'],
                    },
                    colors: {
                        primary: '#16A34A',      /* Emerald Green */
                        secondary: '#2563EB',    /* Royal Blue */
                        goldAccent: '#FBBF24',   /* Golden Yellow */
                        orangeAccent: '#F97316', /* Orange */
                        lightBg: '#F8FAFC',      /* Light Background */
                        darkText: '#0F172A',     /* Text Color */
                    }
                }
            }
        }
    </script>

    <style>
        [x-cloak] { display: none !important; }
        body { font-family: 'Outfit', sans-serif; background-color: #F8FAFC; color: #0F172A; }
        
        .bg-asfi-pattern {
            background-color: #F8FAFC;
            background-image: radial-gradient(rgba(22, 163, 74, 0.05) 1px, transparent 1px), radial-gradient(rgba(37, 99, 235, 0.04) 1px, #F8FAFC 1px);
            background-size: 32px 32px;
            background-position: 0 0, 16px 16px;
        }

        .asfi-card {
            background: #FFFFFF;
            border-radius: 1.5rem;
            border: 1px solid rgba(22, 163, 74, 0.18);
            box-shadow: 0 10px 25px -5px rgba(22, 163, 74, 0.06);
            transition: all 0.3s ease;
        }

        .asfi-card:hover {
            border-color: rgba(22, 163, 74, 0.35);
            box-shadow: 0 20px 30px -10px rgba(22, 163, 74, 0.12);
        }

        /* Beautiful Micro-Animations for Coming Soon */
        @keyframes floatSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
        }

        @keyframes pulseGlow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.08); }
        }

        @keyframes shimmerText {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }

        @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .animate-float {
            animation: floatSlow 4.5s ease-in-out infinite;
        }

        .animate-glow-ring {
            animation: pulseGlow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
            animation: spinSlow 20s linear infinite;
        }

        .shimmer-heading {
            background: linear-gradient(90deg, #0F172A 0%, #16A34A 50%, #0F172A 100%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            animation: shimmerText 5s linear infinite;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #F8FAFC; }
        ::-webkit-scrollbar-thumb { background: #16A34A; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #15803D; }
    </style>
</head>
<body x-data="asfiApp()" :class="showComingSoon ? 'overflow-hidden h-screen' : 'min-h-screen'" class="selection:bg-[#16A34A] selection:text-white relative text-darkText bg-asfi-pattern">

    <!-- =================================================================== -->
    <!-- 1. COMING SOON INSHAALLAH LAUNCH PAGE (ANIMATED STANDALONE PAGE) -->
    <!-- =================================================================== -->
    <div x-show="showComingSoon"
         class="fixed inset-0 z-50 h-screen w-screen bg-gradient-to-br from-emerald-50/90 via-white to-blue-50/70 flex flex-col justify-between p-4 md:p-8 overflow-hidden">
        
        <!-- Top Bar inside Coming Soon Splash -->
        <header class="max-w-6xl mx-auto w-full flex items-center justify-between py-2 relative z-10">
            <div class="flex items-center gap-3">
                <img src="asfi_logo_2026.png" alt="ASFI Official Logo" loading="lazy" decoding="async" class="h-12 w-12 sm:h-14 sm:w-14 object-contain drop-shadow-md">
                <div>
                    <h1 class="text-xs sm:text-sm font-black tracking-wider text-darkText uppercase"><span class="text-primary font-black">AMIS</span> SADAQAH FAMILY INCORPORATED</h1>
                    <p class="text-[10px] sm:text-[11px] font-extrabold text-primary uppercase tracking-widest">2026</p>
                </div>
            </div>
        </header>

        <!-- Background Floating Decorative Elements (Background Animation Only) -->
        <div class="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-emerald-300/25 blur-3xl pointer-events-none animate-glow-ring"></div>
        <div class="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-amber-300/25 blur-3xl pointer-events-none animate-glow-ring" style="animation-delay: 1.5s;"></div>

        <!-- Center Content: Coming Soon InshaAllah -->
        <main class="max-w-3xl mx-auto w-full text-center my-auto py-4 sm:py-6 px-2 sm:px-4 space-y-4 sm:space-y-5 relative z-10">
            
            <!-- Arabic Bismillah Calligraphy Banner -->
            <div class="space-y-1">
                <p class="font-arabic text-2xl sm:text-4xl md:text-5xl text-primary font-bold tracking-wide">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            </div>

            <!-- Big Logo Display (Static, Clean) -->
            <div class="relative inline-block my-1">
                <img src="asfi_logo_2026.png" alt="ASFI Logo" loading="lazy" decoding="async" class="relative h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 mx-auto object-contain drop-shadow-xl">
            </div>

            <!-- Headline & Tagline -->
            <div class="space-y-2">
                <h2 class="text-2xl sm:text-4xl md:text-5xl font-black text-darkText tracking-tight leading-tight">
                    Coming Soon <span class="text-primary font-black">InshaAllah</span>
                </h2>
                <p class="text-xs sm:text-sm font-extrabold text-primary uppercase tracking-wider">Developed by: Mon Zhairel Lingasa</p>
            </div>

            <!-- Get Notified Subscription Form -->
            <div class="pt-1 max-w-md mx-auto w-full px-2">
                <form @submit.prevent="subscribeNewsletter()" class="flex flex-col sm:flex-row gap-2">
                    <input type="email" x-model="subscriberEmail" required placeholder="Enter your email address..." class="flex-1 rounded-xl bg-white border border-emerald-300 px-4 py-2.5 text-xs text-darkText placeholder-slate-400 focus:border-primary focus:outline-none shadow-sm transition focus:ring-2 focus:ring-emerald-400">
                    <button type="submit" class="rounded-xl bg-primary hover:bg-emerald-700 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap">
                        Notify Me
                    </button>
                </form>
                <p x-show="subscribed" x-cloak class="text-xs font-black text-primary mt-2">
                    JazakAllahu Khairan! We will notify you on launch day.
                </p>
            </div>
        </main>

        <!-- Footer inside Coming Soon -->
        <footer class="max-w-6xl mx-auto w-full text-center text-[10px] sm:text-[11px] text-slate-500 py-2 border-t border-slate-200 font-medium relative z-10 space-y-0.5">
            <p>© 2026 AMIS Sadaqah Family Incorporated (ASFI). All Rights Reserved.</p>
            <p class="text-primary font-extrabold">Developed by: Mon Zhairel Lingasa</p>
        </footer>
    </div>


    <!-- =================================================================== -->
    <!-- 2. MAIN WEBSITE APP (HIDDEN WHILE COMING SOON IS ACTIVE) -->
    <!-- =================================================================== -->
    <div x-show="!showComingSoon" x-cloak>
        
        <!-- Top Banner -->
        <div class="bg-primary text-white px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold text-center flex items-center justify-between shadow-xs">
            <div class="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
                <div class="flex items-center gap-2 truncate">
                    <span class="inline-block w-2 h-2 rounded-full bg-goldAccent animate-ping shrink-0"></span>
                    <span class="truncate">✨ Official ASFI Web Application 2026</span>
                </div>
            </div>
        </div>

        <!-- Main Navigation Header -->
        <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-emerald-100 px-4 py-3.5 shadow-xs transition-all">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <!-- Brand Logo -->
                <a href="#" class="flex items-center gap-2.5 sm:gap-3">
                    <img src="asfi_logo_2026.png" alt="ASFI Logo" loading="lazy" decoding="async" class="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-sm">
                    <div>
                        <span class="block text-xs sm:text-sm font-black tracking-wider text-darkText uppercase leading-none">ASFI 2026</span>
                        <span class="text-[9px] sm:text-[10px] font-extrabold text-primary tracking-wider"><span class="text-primary font-black">AMIS</span> SADAQAH FAMILY INC.</span>
                    </div>
                </a>

                <!-- Desktop Nav Links -->
                <nav class="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-bold text-slate-700">
                    <a href="#about" class="hover:text-primary transition">About Us</a>
                    <a href="#programs" class="hover:text-primary transition">Programs</a>
                    <a href="#impact" class="hover:text-primary transition">Impact</a>
                    <a href="#stories" class="hover:text-primary transition">Success Stories</a>
                    <a href="#faq" class="hover:text-primary transition">FAQ</a>
                    <a href="#contact" class="hover:text-primary transition">Contact</a>
                </nav>

                <!-- Action Buttons & Mobile Hamburger -->
                <div class="flex items-center gap-2">
                    <button @click="openVolunteerModal()" type="button" class="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-secondary/30 bg-blue-50 px-3.5 py-2 text-xs font-bold text-secondary hover:bg-blue-100 transition shadow-2xs">
                        <i data-lucide="heart-handshake" class="h-4 w-4 text-secondary"></i>
                        <span>Volunteer</span>
                    </button>
                    <button @click="openDonateModal()" type="button" class="inline-flex items-center gap-1.5 rounded-xl bg-primary hover:bg-emerald-700 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition active:scale-95 cursor-pointer">
                        <i data-lucide="hand-heart" class="h-4 w-4 text-goldAccent"></i>
                        <span>Donate</span>
                    </button>

                    <!-- Mobile Navigation Toggle Button -->
                    <button @click="mobileNav = !mobileNav" type="button" class="md:hidden p-2 text-slate-700 hover:text-primary rounded-lg focus:outline-none cursor-pointer">
                        <i data-lucide="menu" class="h-6 w-6" x-show="!mobileNav"></i>
                        <i data-lucide="x" class="h-6 w-6" x-show="mobileNav" x-cloak></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Drawer Navigation -->
            <div x-show="mobileNav" x-cloak x-collapse class="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 font-bold text-xs">
                <a href="#about" @click="mobileNav = false" class="block py-2 text-slate-700 hover:text-primary">About Us</a>
                <a href="#programs" @click="mobileNav = false" class="block py-2 text-slate-700 hover:text-primary">Our Programs</a>
                <a href="#impact" @click="mobileNav = false" class="block py-2 text-slate-700 hover:text-primary">Our Impact</a>
                <a href="#stories" @click="mobileNav = false" class="block py-2 text-slate-700 hover:text-primary">Success Stories</a>
                <a href="#faq" @click="mobileNav = false" class="block py-2 text-slate-700 hover:text-primary">FAQ</a>
                <a href="#contact" @click="mobileNav = false" class="block py-2 text-slate-700 hover:text-primary">Contact Us</a>
                <div class="pt-2 flex flex-col gap-2">
                    <button @click="mobileNav = false; openVolunteerModal()" class="w-full text-center py-2.5 rounded-xl border border-secondary text-secondary font-bold">
                        Become a Volunteer
                    </button>
                </div>
            </div>
        </header>


        <!-- HERO SECTION -->
        <section class="relative pt-8 sm:pt-12 pb-16 sm:pb-20 md:py-24 bg-gradient-to-br from-emerald-50/70 via-white to-blue-50/50 overflow-hidden border-b border-emerald-100">
            <div class="max-w-7xl mx-auto px-4 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    <!-- Left Hero Content -->
                    <div class="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
                        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100/80 px-3.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-primary shadow-2xs">
                            <i data-lucide="sparkles" class="h-3.5 w-3.5 text-orangeAccent"></i>
                            <span>Takaful & Mutual Community Support</span>
                        </div>

                        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-darkText tracking-tight leading-[1.15]">
                            Empowering Communities Through <span class="text-primary">Compassion & Mutual Support</span>
                        </h1>

                        <p class="text-sm sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            AMIS Sadaqah Family Incorporated (ASFI) is a modern humanitarian foundation dedicated to uplifting underprivileged families through Education Grants, Emergency Medical Relief, Orphan Care, and Disaster Assistance.
                        </p>

                        <div class="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                            <button @click="openDonateModal()" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-emerald-700 px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xl transition active:scale-95 cursor-pointer">
                                <i data-lucide="heart" class="h-4 w-4 text-goldAccent"></i>
                                <span>Donate Sadaqah & Zakat</span>
                            </button>
                            <a href="#programs" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-darkText shadow-sm hover:bg-slate-50 transition">
                                <span>Explore Our Programs</span>
                                <i data-lucide="chevron-right" class="h-4 w-4 text-primary"></i>
                            </a>
                        </div>

                        <!-- Quick Trust Indicators -->
                        <div class="pt-6 border-t border-slate-200 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
                            <div>
                                <span class="block text-xl sm:text-3xl font-black text-primary">100%</span>
                                <span class="text-[10px] sm:text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Audited Amanah</span>
                            </div>
                            <div>
                                <span class="block text-xl sm:text-3xl font-black text-orangeAccent">12,500+</span>
                                <span class="text-[10px] sm:text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Lives Touched</span>
                            </div>
                            <div>
                                <span class="block text-xl sm:text-3xl font-black text-secondary">SEC 2026</span>
                                <span class="text-[10px] sm:text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Registered</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Hero Visual Card -->
                    <div class="lg:col-span-5">
                        <div class="asfi-card p-3 sm:p-4 space-y-3 sm:space-y-4">
                            <!-- Hero Image Banner -->
                            <div class="relative h-60 sm:h-72 lg:h-80 rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop" alt="Volunteers helping children" loading="lazy" decoding="async" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                                
                                <div class="absolute bottom-3 left-3 right-3 text-white">
                                    <span class="inline-block px-2.5 py-0.5 rounded-full bg-primary text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider mb-1">Active Community Mission</span>
                                    <h3 class="text-sm sm:text-base font-extrabold">Family Relief Drive 2026</h3>
                                    <p class="text-[11px] sm:text-xs text-slate-200">Delivering food baskets & health support to 450 families.</p>
                                </div>
                            </div>

                            <!-- Featured Program Mini Cards -->
                            <div class="grid grid-cols-2 gap-2.5 sm:gap-3">
                                <div class="rounded-xl bg-emerald-50 p-3 border border-emerald-200 shadow-2xs">
                                    <div class="flex items-center gap-1.5 text-primary font-extrabold text-xs">
                                        <i data-lucide="graduation-cap" class="h-4 w-4 text-primary shrink-0"></i>
                                        <span class="truncate">Education Grants</span>
                                    </div>
                                    <span class="block text-[11px] font-bold text-slate-600 mt-1">250+ Scholars</span>
                                </div>
                                <div class="rounded-xl bg-blue-50 p-3 border border-blue-200 shadow-2xs">
                                    <div class="flex items-center gap-1.5 text-secondary font-extrabold text-xs">
                                        <i data-lucide="stethoscope" class="h-4 w-4 text-secondary shrink-0"></i>
                                        <span class="truncate">Medical Aid</span>
                                    </div>
                                    <span class="block text-[11px] font-bold text-slate-600 mt-1">1,000+ Patients</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        <!-- ABOUT THE FOUNDATION SECTION -->
        <section id="about" class="py-16 sm:py-20 bg-white relative border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
                    <span class="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-800 border border-amber-300">
                        Our Mission & Values
                    </span>
                    <h2 class="text-2xl sm:text-4xl font-black text-darkText">About ASFI Foundation</h2>
                    <p class="text-xs sm:text-base text-slate-600 font-medium">
                        AMIS Sadaqah Family Incorporated (ASFI) was established to serve as a beacon of mutual assistance (Takaful), ensuring no family struggles alone during hardship.
                    </p>
                </div>

                <!-- 4 Core Pillars Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    
                    <div class="bg-emerald-50/60 rounded-3xl p-5 sm:p-6 space-y-3 border border-emerald-200 shadow-xs hover:border-primary hover:shadow-md transition">
                        <div class="w-12 h-12 rounded-2xl bg-[#16A34A] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                            <i data-lucide="shield-check" class="h-6 w-6"></i>
                        </div>
                        <h3 class="text-base sm:text-lg font-extrabold text-darkText">Amanah (Trust)</h3>
                        <p class="text-xs text-slate-600 leading-relaxed font-medium">
                            Complete financial transparency, audited records, and 100% verified distribution of Sadaqah and Zakat funds.
                        </p>
                    </div>

                    <div class="bg-blue-50/60 rounded-3xl p-5 sm:p-6 space-y-3 border border-blue-200 shadow-xs hover:border-secondary hover:shadow-md transition">
                        <div class="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                            <i data-lucide="users" class="h-6 w-6"></i>
                        </div>
                        <h3 class="text-base sm:text-lg font-extrabold text-darkText">Takaful (Mutual Support)</h3>
                        <p class="text-xs text-slate-600 leading-relaxed font-medium">
                            Rooted in mutual solidarity, community members unite to share burdens and protect vulnerable families.
                        </p>
                    </div>

                    <div class="bg-amber-50/60 rounded-3xl p-5 sm:p-6 space-y-3 border border-amber-200 shadow-xs hover:border-goldAccent hover:shadow-md transition">
                        <div class="w-12 h-12 rounded-2xl bg-[#F97316] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                            <i data-lucide="heart" class="h-6 w-6"></i>
                        </div>
                        <h3 class="text-base sm:text-lg font-extrabold text-darkText">Ikhlas (Pure Intent)</h3>
                        <p class="text-xs text-slate-600 leading-relaxed font-medium">
                            Serving humanity with unconditional compassion, dignity, and respect for every beneficiary.
                        </p>
                    </div>

                    <div class="bg-emerald-50/60 rounded-3xl p-5 sm:p-6 space-y-3 border border-emerald-200 shadow-xs hover:border-primary hover:shadow-md transition">
                        <div class="w-12 h-12 rounded-2xl bg-[#16A34A] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                            <i data-lucide="sparkles" class="h-6 w-6"></i>
                        </div>
                        <h3 class="text-base sm:text-lg font-extrabold text-darkText">Ukhuwah (Unity)</h3>
                        <p class="text-xs text-slate-600 leading-relaxed font-medium">
                            Strengthening community ties by connecting donors, volunteers, and families in a cycle of good.
                        </p>
                    </div>

                </div>
            </div>
        </section>


        <!-- OUR PROGRAMS SECTION -->
        <section id="programs" class="py-16 sm:py-20 bg-[#F8FAFC] relative border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
                    <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-primary border border-emerald-300">
                        Humanitarian Initiatives
                    </span>
                    <h2 class="text-2xl sm:text-4xl font-black text-darkText">Our Core Programs</h2>
                    <p class="text-xs sm:text-base text-slate-600 font-medium">
                        Structured community programs designed to empower underprivileged youth, families, and orphans in Mindanao.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    
                    <!-- Program 1: Education Assistance -->
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-[#16A34A] hover:shadow-xl transition duration-300">
                        <div class="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" alt="Education Assistance" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            <span class="absolute top-3 left-3 bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Education</span>
                        </div>
                        <div class="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="text-lg sm:text-xl font-black text-darkText group-hover:text-primary transition">Education Assistance</h3>
                                <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                    Scholarships, learning supplies, school uniforms, and tutoring support for deserving students.
                                </p>
                            </div>
                            <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-primary">
                                <span>250+ Active Scholars</span>
                                <button @click="openProgramModal('Education Assistance')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                            </div>
                        </div>
                    </div>

                    <!-- Program 2: Medical Assistance -->
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-[#2563EB] hover:shadow-xl transition duration-300">
                        <div class="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                            <img src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop" alt="Medical Assistance" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            <span class="absolute top-3 left-3 bg-[#2563EB] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Healthcare</span>
                        </div>
                        <div class="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="text-lg sm:text-xl font-black text-darkText group-hover:text-secondary transition">Medical Assistance</h3>
                                <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                    Emergency healthcare grants, prescription medication aid, dialysis support, and hospital bill assistance.
                                </p>
                            </div>
                            <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-secondary">
                                <span>1,000+ Patients Helped</span>
                                <button @click="openProgramModal('Medical Assistance')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                            </div>
                        </div>
                    </div>

                    <!-- Program 3: Disaster Relief -->
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-[#F97316] hover:shadow-xl transition duration-300">
                        <div class="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop" alt="Disaster Relief" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            <span class="absolute top-3 left-3 bg-[#F97316] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Emergency</span>
                        </div>
                        <div class="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="text-lg sm:text-xl font-black text-darkText group-hover:text-orangeAccent transition">Disaster Relief</h3>
                                <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                    Rapid deployment of emergency food packs, clean drinking water, hygiene kits, and temporary shelter during calamities.
                                </p>
                            </div>
                            <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-orangeAccent">
                                <span>50+ Relief Missions</span>
                                <button @click="openProgramModal('Disaster Relief')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                            </div>
                        </div>
                    </div>

                    <!-- Program 4: Livelihood Support -->
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-[#16A34A] hover:shadow-xl transition duration-300">
                        <div class="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" alt="Livelihood Support" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            <span class="absolute top-3 left-3 bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Livelihood</span>
                        </div>
                        <div class="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="text-lg sm:text-xl font-black text-darkText group-hover:text-primary transition">Livelihood Support</h3>
                                <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                    Micro-grants, small business starter kits, and vocational skills training for struggling parents and breadwinners.
                                </p>
                            </div>
                            <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-primary">
                                <span>120+ Micro-Businesses</span>
                                <button @click="openProgramModal('Livelihood Support')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                            </div>
                        </div>
                    </div>

                    <!-- Program 5: Orphan & Widow Support -->
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-[#FBBF24] hover:shadow-xl transition duration-300">
                        <div class="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" alt="Orphan Support" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            <span class="absolute top-3 left-3 bg-[#F97316] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Orphan Care</span>
                        </div>
                        <div class="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="text-lg sm:text-xl font-black text-darkText group-hover:text-orangeAccent transition">Orphan & Widow Support</h3>
                                <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                    Monthly care stipends, educational backing, nutritional aid, and holistic family counseling for orphans.
                                </p>
                            </div>
                            <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-orangeAccent">
                                <span>180+ Orphans Sponsored</span>
                                <button @click="openProgramModal('Orphan Support')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                            </div>
                        </div>
                    </div>

                    <!-- Program 6: Community Development -->
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-[#2563EB] hover:shadow-xl transition duration-300">
                        <div class="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                            <img src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=800&auto=format&fit=crop" alt="Community Development" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                            <span class="absolute top-3 left-3 bg-[#2563EB] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Development</span>
                        </div>
                        <div class="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="text-lg sm:text-xl font-black text-darkText group-hover:text-secondary transition">Community Development</h3>
                                <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                    Installation of community water stations, sanitation facilities, and community center improvements.
                                </p>
                            </div>
                            <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-secondary">
                                <span>15 Water Stations Built</span>
                                <button @click="openProgramModal('Community Development')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        <!-- IMPACT STATISTICS COUNTER SECTION -->
        <section id="impact" class="py-12 sm:py-16 bg-[#16A34A] text-white shadow-md">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
                    
                    <div class="space-y-1 sm:space-y-2">
                        <div class="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/20 text-white mb-1 shadow-inner">
                            <i data-lucide="users" class="h-5 w-5 sm:h-6 sm:w-6"></i>
                        </div>
                        <span class="block text-3xl sm:text-5xl font-black">12,500+</span>
                        <span class="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-100">Beneficiaries Reached</span>
                    </div>

                    <div class="space-y-1 sm:space-y-2">
                        <div class="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/20 text-goldAccent mb-1 shadow-inner">
                            <i data-lucide="graduation-cap" class="h-5 w-5 sm:h-6 sm:w-6"></i>
                        </div>
                        <span class="block text-3xl sm:text-5xl font-black text-goldAccent">250+</span>
                        <span class="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-100">Scholarships Granted</span>
                    </div>

                    <div class="space-y-1 sm:space-y-2">
                        <div class="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/20 text-white mb-1 shadow-inner">
                            <i data-lucide="heart-pulse" class="h-5 w-5 sm:h-6 sm:w-6"></i>
                        </div>
                        <span class="block text-3xl sm:text-5xl font-black">1,000+</span>
                        <span class="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-100">Medical Aid Cases</span>
                    </div>

                    <div class="space-y-1 sm:space-y-2">
                        <div class="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/20 text-goldAccent mb-1 shadow-inner">
                            <i data-lucide="building-2" class="h-5 w-5 sm:h-6 sm:w-6"></i>
                        </div>
                        <span class="block text-3xl sm:text-5xl font-black text-goldAccent">50+</span>
                        <span class="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-100">Community Projects</span>
                    </div>

                </div>
            </div>
        </section>


        <!-- HOW YOU CAN HELP SECTION -->
        <section class="py-16 sm:py-20 bg-white border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
                    <span class="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-800 border border-amber-300">
                        Join Our Cause
                    </span>
                    <h2 class="text-2xl sm:text-4xl font-black text-darkText">How You Can Help</h2>
                    <p class="text-xs sm:text-base text-slate-600 font-medium">
                        Your generosity creates an immediate impact for families and children.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    
                    <!-- Option 1: Donate -->
                    <div class="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 text-center border border-slate-200 shadow-sm hover:border-[#FBBF24] hover:shadow-xl transition flex flex-col justify-between">
                        <div class="space-y-4">
                            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-100 text-[#F97316] flex items-center justify-center mx-auto border border-amber-300">
                                <i data-lucide="hand-heart" class="h-7 w-7 sm:h-8 sm:w-8"></i>
                            </div>
                            <h3 class="text-xl sm:text-2xl font-black text-darkText">Donate Sadaqah & Zakat</h3>
                            <p class="text-xs text-slate-600 leading-relaxed font-medium">
                                Fulfill your Zakat obligations or give Sadaqah to fund scholarships, emergency medical aid, and relief.
                            </p>
                        </div>
                        <button @click="openDonateModal()" class="w-full mt-6 bg-[#FBBF24] hover:bg-amber-400 text-darkText py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition active:scale-95 cursor-pointer">
                            Make a Donation
                        </button>
                    </div>

                    <!-- Option 2: Volunteer -->
                    <div class="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 text-center border border-slate-200 shadow-sm hover:border-[#16A34A] hover:shadow-xl transition flex flex-col justify-between">
                        <div class="space-y-4">
                            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center mx-auto border border-emerald-300">
                                <i data-lucide="heart-handshake" class="h-7 w-7 sm:h-8 sm:w-8"></i>
                            </div>
                            <h3 class="text-xl sm:text-2xl font-black text-darkText">Become a Volunteer</h3>
                            <p class="text-xs text-slate-600 leading-relaxed font-medium">
                                Join our community team to help distribute food relief, assist in medical drives, and tutor scholars.
                            </p>
                        </div>
                        <button @click="openVolunteerModal()" class="w-full mt-6 bg-[#16A34A] hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition active:scale-95 cursor-pointer">
                            Join as Volunteer
                        </button>
                    </div>

                    <!-- Option 3: Partner -->
                    <div class="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 text-center border border-slate-200 shadow-sm hover:border-[#2563EB] hover:shadow-xl transition flex flex-col justify-between">
                        <div class="space-y-4">
                            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 text-secondary flex items-center justify-center mx-auto border border-blue-300">
                                <i data-lucide="building-2" class="h-7 w-7 sm:h-8 sm:w-8"></i>
                            </div>
                            <h3 class="text-xl sm:text-2xl font-black text-darkText">Partner With Us</h3>
                            <p class="text-xs text-slate-600 leading-relaxed font-medium">
                                Collaborate with ASFI as a corporate CSR partner, educational institution, or NGO to multiply community impact.
                            </p>
                        </div>
                        <a href="#contact" class="w-full mt-6 inline-block bg-[#2563EB] hover:bg-blue-700 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition">
                            Partner Inquiries
                        </a>
                    </div>

                </div>
            </div>
        </section>


        <!-- SUCCESS STORIES SECTION -->
        <section id="stories" class="py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
                    <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-primary border border-emerald-300">
                        Real Impact
                    </span>
                    <h2 class="text-2xl sm:text-4xl font-black text-darkText">Success Stories</h2>
                    <p class="text-xs sm:text-base text-slate-600 font-medium">
                        Read how your generosity creates lasting transformation for students and families.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    
                    <!-- Story 1 -->
                    <div class="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5 sm:gap-6 items-center text-center sm:text-left">
                        <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop" alt="Scholar Story" loading="lazy" decoding="async" class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-primary shrink-0">
                        <div class="space-y-2">
                            <div class="flex items-center justify-center sm:justify-start gap-1 text-goldAccent">
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            </div>
                            <p class="text-xs text-slate-700 italic leading-relaxed font-medium">
                                "Without the ASFI Education Scholarship, continuing my Grade 11 studies would have been impossible. Alhamdulillāh, now I can pursue my dream of becoming an educator."
                            </p>
                            <h4 class="text-xs sm:text-sm font-black text-darkText">Fatima Z. — ASFI Scholar 2026</h4>
                            <span class="text-[10px] font-extrabold text-primary uppercase tracking-wider block">Education Assistance Program</span>
                        </div>
                    </div>

                    <!-- Story 2 -->
                    <div class="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5 sm:gap-6 items-center text-center sm:text-left">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" alt="Medical Aid Story" loading="lazy" decoding="async" class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-secondary shrink-0">
                        <div class="space-y-2">
                            <div class="flex items-center justify-center sm:justify-start gap-1 text-goldAccent">
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                                <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            </div>
                            <p class="text-xs text-slate-700 italic leading-relaxed font-medium">
                                "When my husband required urgent dialysis treatment, ASFI stepped in with emergency medical assistance within 24 hours. May Allāh reward the donors continuously."
                            </p>
                            <h4 class="text-xs sm:text-sm font-black text-darkText">Mariam S. — Beneficiary Family</h4>
                            <span class="text-[10px] font-extrabold text-secondary uppercase tracking-wider block">Medical Aid Assistance</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        <!-- FAQ ACCORDION SECTION -->
        <section id="faq" class="py-16 sm:py-20 bg-white relative border-b border-slate-200">
            <div class="max-w-4xl mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
                    <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-primary border border-emerald-300">
                        Got Questions?
                    </span>
                    <h2 class="text-2xl sm:text-4xl font-black text-darkText">Frequently Asked Questions</h2>
                </div>

                <div class="space-y-3 sm:space-y-4" x-data="{ openFaq: 1 }">
                    
                    <div class="bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden">
                        <button @click="openFaq = (openFaq === 1 ? 0 : 1)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between font-black text-darkText text-xs sm:text-sm cursor-pointer gap-2">
                            <span>How are ASFI Sadaqah and Zakat funds verified and audited?</span>
                            <i data-lucide="chevron-down" class="h-4 w-4 text-primary shrink-0 transition-transform" :class="openFaq === 1 ? 'rotate-180' : ''"></i>
                        </button>
                        <div x-show="openFaq === 1" x-collapse class="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200 pt-3">
                            ASFI operates under strict Amanah (Trust) principles. 100% of designated Zakat funds are disbursed directly to eligible beneficiaries (Asnaf). We maintain audited accounting records and publish transparency reports.
                        </div>
                    </div>

                    <div class="bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden">
                        <button @click="openFaq = (openFaq === 2 ? 0 : 2)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between font-black text-darkText text-xs sm:text-sm cursor-pointer gap-2">
                            <span>Who is eligible for ASFI Education Scholarships?</span>
                            <i data-lucide="chevron-down" class="h-4 w-4 text-primary shrink-0 transition-transform" :class="openFaq === 2 ? 'rotate-180' : ''"></i>
                        </button>
                        <div x-show="openFaq === 2" x-collapse class="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200 pt-3">
                            Students enrolled in Kinder to Grade 12 or college programs who come from low-income families or orphan backgrounds can apply for education assistance through our portal.
                        </div>
                    </div>

                    <div class="bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden">
                        <button @click="openFaq = (openFaq === 3 ? 0 : 3)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between font-black text-darkText text-xs sm:text-sm cursor-pointer gap-2">
                            <span>How can a family request Emergency Medical Assistance?</span>
                            <i data-lucide="chevron-down" class="h-4 w-4 text-primary shrink-0 transition-transform" :class="openFaq === 3 ? 'rotate-180' : ''"></i>
                        </button>
                        <div x-show="openFaq === 3" x-collapse class="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200 pt-3">
                            Families can submit a medical assistance request by filling out our online form or visiting our office with a valid medical prescription/abstract and proof of identity.
                        </div>
                    </div>

                    <div class="bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden">
                        <button @click="openFaq = (openFaq === 4 ? 0 : 4)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between font-black text-darkText text-xs sm:text-sm cursor-pointer gap-2">
                            <span>What payment methods are supported for donations?</span>
                            <i data-lucide="chevron-down" class="h-4 w-4 text-primary shrink-0 transition-transform" :class="openFaq === 4 ? 'rotate-180' : ''"></i>
                        </button>
                        <div x-show="openFaq === 4" x-collapse class="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200 pt-3">
                            We accept GCash online transfer, QR Ph instant scanning, and direct bank transfers (BDO / BPI). All donors receive an official digital receipt.
                        </div>
                    </div>

                </div>
            </div>
        </section>


        <!-- CONTACT & OFFICE LOCATIONS SECTION -->
        <section id="contact" class="py-16 sm:py-20 bg-[#F8FAFC]">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    <!-- Contact Info -->
                    <div class="lg:col-span-5 space-y-5 sm:space-y-6">
                        <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-primary border border-emerald-300">
                            Get In Touch
                        </span>
                        <h2 class="text-2xl sm:text-3xl font-black text-darkText">Contact ASFI Foundation</h2>
                        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                            Have questions about our programs, sponsorships, or volunteering? Reach out to our team today.
                        </p>

                        <div class="space-y-4 pt-2">
                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-primary flex items-center justify-center shrink-0 border border-emerald-300">
                                    <i data-lucide="map-pin" class="h-5 w-5"></i>
                                </div>
                                <div>
                                    <h4 class="text-xs font-extrabold text-darkText uppercase tracking-wider">Headquarters Location</h4>
                                    <p class="text-xs text-slate-600 mt-0.5 font-medium">AMIS Sadaqah Family Inc., Philippines</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 rounded-xl bg-amber-100 text-[#F97316] flex items-center justify-center shrink-0 border border-amber-300">
                                    <i data-lucide="clock" class="h-5 w-5"></i>
                                </div>
                                <div>
                                    <h4 class="text-xs font-extrabold text-darkText uppercase tracking-wider">Office Hours</h4>
                                    <p class="text-xs text-slate-600 mt-0.5 font-medium">Saturday to Thursday: 8:00 AM – 4:00 PM</p>
                                    <span class="text-[10px] font-bold text-rose-600 uppercase">Friday: Closed</span>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 rounded-xl bg-blue-100 text-secondary flex items-center justify-center shrink-0 border border-blue-300">
                                    <i data-lucide="mail" class="h-5 w-5"></i>
                                </div>
                                <div>
                                    <h4 class="text-xs font-extrabold text-darkText uppercase tracking-wider">Email Address</h4>
                                    <p class="text-xs text-primary font-bold mt-0.5">asfi@amis.edu.ph</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Inquiry Form -->
                    <div class="lg:col-span-7">
                        <div class="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm">
                            <h3 class="text-lg sm:text-xl font-black text-darkText mb-4">Send Us a Message</h3>
                            <form @submit.prevent="submitContactForm()" class="space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-[11px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">Your Full Name</label>
                                        <input type="text" x-model="contactForm.name" required placeholder="e.g. Ahmad Baulo" class="w-full rounded-xl bg-[#F8FAFC] border border-slate-300 px-4 py-2.5 text-xs text-darkText placeholder-slate-400 focus:border-primary focus:outline-none">
                                    </div>
                                    <div>
                                        <label class="block text-[11px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">Email Address</label>
                                        <input type="email" x-model="contactForm.email" required placeholder="e.g. ahmad@example.com" class="w-full rounded-xl bg-[#F8FAFC] border border-slate-300 px-4 py-2.5 text-xs text-darkText placeholder-slate-400 focus:border-primary focus:outline-none">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[11px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">Subject / Purpose</label>
                                    <select x-model="contactForm.subject" required class="w-full rounded-xl bg-[#F8FAFC] border border-slate-300 px-4 py-2.5 text-xs text-darkText focus:border-primary focus:outline-none">
                                        <option value="" disabled>Select Purpose</option>
                                        <option value="Education Assistance Inquiry">Education Assistance Inquiry</option>
                                        <option value="Medical Grant Request">Medical Grant Request</option>
                                        <option value="Sadaqah / Zakat Verification">Sadaqah / Zakat Verification</option>
                                        <option value="Volunteering & Partnership">Volunteering & Partnership</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-[11px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">Message Details</label>
                                    <textarea x-model="contactForm.message" rows="4" required placeholder="Write your message here..." class="w-full rounded-xl bg-[#F8FAFC] border border-slate-300 px-4 py-2.5 text-xs text-darkText placeholder-slate-400 focus:border-primary focus:outline-none"></textarea>
                                </div>
                                <button type="submit" class="w-full bg-[#16A34A] hover:bg-emerald-700 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition active:scale-95 cursor-pointer">
                                    Send Message
                                </button>
                                <p x-show="contactSent" x-cloak class="text-xs text-primary font-black text-center mt-2">
                                    JazakAllahu Khairan! Message sent successfully. Our team will contact you shortly.
                                </p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        <!-- FOOTER -->
        <footer class="bg-[#0F172A] text-slate-300 text-xs py-10 sm:py-12">
            <div class="max-w-7xl mx-auto px-4 space-y-6 sm:space-y-8">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div class="flex items-center gap-3">
                        <img src="asfi_logo_2026.png" alt="ASFI Logo" loading="lazy" decoding="async" class="h-10 w-10 object-contain">
                        <div>
                            <span class="block text-xs sm:text-sm font-black text-white uppercase">ASFI 2026</span>
                            <span class="text-[10px] text-[#FBBF24] font-bold"><span class="text-primary font-black">AMIS</span> SADAQAH FAMILY INCORPORATED</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap justify-center items-center gap-4 sm:gap-6 font-bold text-slate-300 text-xs">
                        <a href="#about" class="hover:text-[#FBBF24]">About</a>
                        <a href="#programs" class="hover:text-[#FBBF24]">Programs</a>
                        <a href="#impact" class="hover:text-[#FBBF24]">Impact</a>
                        <a href="#faq" class="hover:text-[#FBBF24]">FAQ</a>
                        <a href="#contact" class="hover:text-[#FBBF24]">Contact</a>
                    </div>
                </div>
                
                <div class="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 gap-3 text-center sm:text-left">
                    <p>© 2026 AMIS Sadaqah Family Incorporated (ASFI). All Rights Reserved.</p>
                    <p class="text-[#16A34A] font-bold">Takaful & Mutual Support</p>
                </div>
            </div>
        </footer>

    </div>


    <!-- =================================================================== -->
    <!-- MODALS: DONATE MODAL -->
    <!-- =================================================================== -->
    <div x-show="donateModal" x-cloak class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 text-darkText shadow-2xl relative space-y-4 my-auto border border-emerald-200" @click.outside="donateModal = false">
            <button @click="donateModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                <i data-lucide="x" class="h-5 w-5"></i>
            </button>

            <div class="text-center space-y-1">
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center mx-auto mb-2 font-bold">
                    <i data-lucide="hand-heart" class="h-6 w-6"></i>
                </div>
                <h3 class="text-lg sm:text-xl font-black text-darkText">Make a Contribution</h3>
                <p class="text-xs text-slate-500 font-medium">Support ASFI foundation programs through Sadaqah or Zakat.</p>
            </div>

            <!-- Donation Type Selection -->
            <div class="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl font-black text-xs">
                <button type="button" @click="donationType = 'Sadaqah'" :class="donationType === 'Sadaqah' ? 'bg-[#16A34A] text-white shadow-xs' : 'text-slate-600'" class="py-2.5 rounded-lg transition">Sadaqah (Voluntary)</button>
                <button type="button" @click="donationType = 'Zakat'" :class="donationType === 'Zakat' ? 'bg-[#16A34A] text-white shadow-xs' : 'text-slate-600'" class="py-2.5 rounded-lg transition">Zakat (Obligatory)</button>
            </div>

            <!-- Payment Details -->
            <div class="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-xs font-medium">
                <h4 class="font-black text-darkText uppercase text-[10px] tracking-wider">Official Bank & GCash Accounts</h4>
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span class="font-bold text-slate-700">GCash Transfer:</span>
                    <span class="font-mono font-black text-primary">09XX-XXX-XXXX</span>
                </div>
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span class="font-bold text-slate-700">Bank Account (BDO):</span>
                    <span class="font-mono font-black text-darkText">0012-3456-7890</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-700">Account Name:</span>
                    <span class="font-bold text-darkText">AMIS Sadaqah Family Inc.</span>
                </div>
            </div>

            <p class="text-[11px] text-slate-500 text-center font-medium">
                JazakAllahu Khairan for your generosity. May Allāh bless and increase your wealth.
            </p>

            <button @click="donateModal = false" class="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs cursor-pointer">
                Close Window
            </button>
        </div>
    </div>


    <!-- =================================================================== -->
    <!-- MODALS: VOLUNTEER MODAL -->
    <!-- =================================================================== -->
    <div x-show="volunteerModal" x-cloak class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 text-darkText shadow-2xl relative space-y-4 my-auto border border-emerald-200" @click.outside="volunteerModal = false">
            <button @click="volunteerModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                <i data-lucide="x" class="h-5 w-5"></i>
            </button>

            <div class="text-center space-y-1">
                <div class="w-12 h-12 rounded-2xl bg-blue-100 text-secondary flex items-center justify-center mx-auto mb-2 font-bold">
                    <i data-lucide="heart-handshake" class="h-6 w-6"></i>
                </div>
                <h3 class="text-lg sm:text-xl font-black text-darkText">Join ASFI Volunteers</h3>
                <p class="text-xs text-slate-500 font-medium">Become a volunteer for community outreaches.</p>
            </div>

            <form @submit.prevent="submitVolunteer()" class="space-y-3 text-xs font-medium">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input type="text" required placeholder="Your full name" class="w-full rounded-xl border border-slate-300 p-2.5 text-darkText focus:border-primary">
                </div>
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Mobile / WhatsApp</label>
                    <input type="text" required placeholder="09XX-XXX-XXXX" class="w-full rounded-xl border border-slate-300 p-2.5 text-darkText focus:border-primary">
                </div>
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Area of Interest</label>
                    <select class="w-full rounded-xl border border-slate-300 p-2.5 text-darkText focus:border-primary">
                        <option>Community Food Relief Drives</option>
                        <option>Medical Mission Assistant</option>
                        <option>Scholar Tutoring & Education</option>
                        <option>Disaster Emergency Response</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-[#16A34A] text-white py-3 rounded-xl font-black text-xs uppercase shadow-md cursor-pointer">
                    Submit Volunteer Registration
                </button>
            </form>
        </div>
    </div>

    <!-- Alpine App State Script -->
    <script>
        function asfiApp() {
            return {
                showComingSoon: true,
                mobileNav: false,
                subscriberEmail: '',
                subscribed: false,
                donateModal: false,
                volunteerModal: false,
                donationType: 'Sadaqah',
                contactSent: false,
                contactForm: {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                },

                init() {
                    this.$nextTick(() => lucide.createIcons());
                },

                subscribeNewsletter() {
                    if (this.subscriberEmail) {
                        this.subscribed = true;
                        this.subscriberEmail = '';
                    }
                },

                openDonateModal() {
                    this.donateModal = true;
                    this.$nextTick(() => lucide.createIcons());
                },

                openVolunteerModal() {
                    this.volunteerModal = true;
                    this.$nextTick(() => lucide.createIcons());
                },

                openProgramModal(programName) {
                    this.openDonateModal();
                },

                submitContactForm() {
                    this.contactSent = true;
                    this.contactForm = { name: '', email: '', subject: '', message: '' };
                },

                submitVolunteer() {
                    alert('JazakAllahu Khairan! Volunteer application submitted successfully.');
                    this.volunteerModal = false;
                }
            }
        }
        document.addEventListener('DOMContentLoaded', () => lucide.createIcons());
    </script>
</body>
</html>
