<?php
// ============================================================================
// ASFI - AMIS SADAQAH FAMILY INCORPORATED (DAVAO CITY 2026)
// Official Web Application & Launch Preview Portal
// Tagline: Empowering Communities Through Compassion and Mutual Support.
// Design System: Clean Light Mode (Emerald Green, Warm Gold, Sky Blue, Soft Slate)
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
    <title>ASFI - AMIS Sadaqah Family Incorporated | Davao City</title>
    <meta name="description" content="AMIS Sadaqah Family Incorporated (ASFI) - Empowering Communities Through Compassion and Mutual Support in Davao City and beyond. Education Assistance, Medical Relief, Orphan Care & Takaful.">
    <meta name="keywords" content="ASFI, AMIS Sadaqah Family Incorporated, Sadaqah, Zakat, Takaful, Davao City, Education Assistance, Medical Aid, Charity Philippines">
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
                        emerald: {
                            50: '#ecfdf5',
                            100: '#d1fae5',
                            200: '#a7f3d0',
                            300: '#6ee7b7',
                            400: '#34d399',
                            500: '#10b981',
                            600: '#059669',
                            700: '#047857',
                            800: '#065f46',
                            900: '#064e3b',
                        },
                        sky: {
                            50: '#f0f9ff',
                            100: '#e0f2fe',
                            200: '#bae6fd',
                            500: '#0ea5e9',
                            600: '#0284c7',
                            700: '#0369a1',
                        },
                        amber: {
                            50: '#fffbeb',
                            100: '#fef3c7',
                            400: '#fbbf24',
                            500: '#f59e0b',
                            600: '#d97706',
                            700: '#b45309',
                        }
                    }
                }
            }
        }
    </script>

    <style>
        [x-cloak] { display: none !important; }
        body { font-family: 'Outfit', sans-serif; background-color: #f8fafc; color: #0f172a; }
        
        /* Subtle Clean Light Pattern */
        .bg-light-pattern {
            background-color: #f8fafc;
            background-image: radial-gradient(rgba(4, 120, 87, 0.05) 1px, transparent 1px), radial-gradient(rgba(2, 132, 199, 0.04) 1px, #f8fafc 1px);
            background-size: 32px 32px;
            background-position: 0 0, 16px 16px;
        }

        .gold-gradient-text {
            background: linear-gradient(135deg, #d97706 0%, #b45309 50%, #f59e0b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .emerald-gradient-text {
            background: linear-gradient(135deg, #047857 0%, #059669 50%, #0d9488 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .emerald-card {
            background: #ffffff;
            border-radius: 1.5rem;
            border: 1px solid rgba(16, 185, 129, 0.2);
            box-shadow: 0 10px 25px -5px rgba(4, 120, 87, 0.06);
            transition: all 0.3s ease;
        }

        .emerald-card:hover {
            border-color: rgba(16, 185, 129, 0.4);
            box-shadow: 0 20px 30px -10px rgba(4, 120, 87, 0.12);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #047857; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #059669; }
    </style>
</head>
<body x-data="asfiApp()" class="min-h-screen selection:bg-emerald-700 selection:text-white relative text-slate-800 bg-light-pattern">

    <!-- =================================================================== -->
    <!-- 1. COMING SOON INSHAALLAH LOADING / SPLASH LAYER (EMERALD & GOLD) -->
    <!-- =================================================================== -->
    <div x-show="showComingSoon"
         x-transition:leave="transition ease-in-out duration-700 transform"
         x-transition:leave-start="opacity-100 scale-100"
         x-transition:leave-end="opacity-0 scale-95"
         class="fixed inset-0 z-50 bg-gradient-to-br from-emerald-50 via-white to-amber-50/60 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 overflow-y-auto">
        
        <!-- Top Bar inside Coming Soon Splash -->
        <header class="max-w-6xl mx-auto w-full flex items-center justify-between py-2">
            <div class="flex items-center gap-3">
                <img src="asfi_logo_2026.png" alt="ASFI Official Logo" class="h-14 w-14 object-contain drop-shadow-md">
                <div>
                    <h1 class="text-sm font-black tracking-wider text-slate-900 uppercase">AMIS SADAQAH FAMILY INCORPORATED</h1>
                    <p class="text-[11px] font-extrabold text-emerald-700 uppercase tracking-widest">Davao City 2026</p>
                </div>
            </div>
            
            <button @click="dismissComingSoon()" type="button" class="inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-700 px-5 py-2 text-xs font-extrabold text-white shadow-md transition hover:bg-emerald-800 cursor-pointer">
                <span>Explore Website Preview</span>
                <i data-lucide="arrow-down-right" class="h-4 w-4"></i>
            </button>
        </header>

        <!-- Center Content: Coming Soon InshaAllah -->
        <main class="max-w-3xl mx-auto w-full text-center my-auto py-8 px-4 space-y-6">
            
            <!-- Arabic Bismillah Calligraphy Banner -->
            <div class="space-y-2">
                <p class="font-arabic text-3xl md:text-5xl text-emerald-800 font-bold tracking-wide">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-800 border border-emerald-300 shadow-xs">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
                    <span>Official Foundation Portal Launching Soon</span>
                </span>
            </div>

            <!-- Big Logo Display -->
            <div class="relative inline-block my-2">
                <div class="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl opacity-60 animate-pulse"></div>
                <img src="asfi_logo_2026.png" alt="ASFI Logo" class="relative h-48 w-48 md:h-56 md:w-56 mx-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300">
            </div>

            <!-- Headline & Tagline -->
            <div class="space-y-3">
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Coming Soon <span class="emerald-gradient-text">InshaAllah</span>
                </h2>
                <p class="text-base md:text-xl font-extrabold text-amber-700 italic max-w-xl mx-auto">
                    "Empowering Communities Through Compassion and Mutual Support."
                </p>
                <p class="text-xs md:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-medium">
                    We are launching a modern, transparent humanitarian foundation platform for ASFI Davao City 2026 to power Education Grants, Emergency Medical Aid, Orphan Support, and Takaful Relief.
                </p>
            </div>

            <!-- Get Notified Subscription Form -->
            <div class="pt-2 max-w-md mx-auto">
                <form @submit.prevent="subscribeNewsletter()" class="flex flex-col sm:flex-row gap-2">
                    <input type="email" x-model="subscriberEmail" required placeholder="Enter your email address..." class="flex-1 rounded-xl bg-white border border-emerald-300 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none shadow-sm">
                    <button type="submit" class="rounded-xl bg-emerald-700 hover:bg-emerald-800 px-7 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition active:scale-95 cursor-pointer whitespace-nowrap">
                        Notify Me
                    </button>
                </form>
                <p x-show="subscribed" x-cloak class="text-xs font-black text-emerald-700 mt-2">
                    JazakAllahu Khairan! We will notify you on launch day.
                </p>
            </div>

            <!-- Explore Preview Button -->
            <div class="pt-3">
                <button @click="dismissComingSoon()" type="button" class="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-8 py-4 text-sm font-black uppercase tracking-wider text-slate-950 shadow-xl transition hover:scale-105 active:scale-95 cursor-pointer">
                    <span>Preview Foundation Website</span>
                    <i data-lucide="arrow-down" class="h-4 w-4"></i>
                </button>
            </div>
        </main>

        <!-- Footer inside Coming Soon -->
        <footer class="max-w-6xl mx-auto w-full text-center text-[11px] text-slate-500 py-2 border-t border-slate-200 font-medium">
            <p>© 2026 AMIS Sadaqah Family Incorporated (ASFI) - Davao City, Philippines. All Rights Reserved.</p>
        </footer>
    </div>


    <!-- =================================================================== -->
    <!-- 2. MAIN WEBSITE APP (EMERALD & GOLD FOUNDATION DESIGN) -->
    <!-- =================================================================== -->
    
    <!-- Top Preview Banner -->
    <div x-show="!showComingSoon" x-cloak class="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-between shadow-xs">
        <div class="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
                <span class="inline-block w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
                <span>✨ Previewing Official ASFI Web Application (Davao City 2026)</span>
            </div>
            <button @click="showComingSoon = true" class="text-[11px] font-black uppercase underline text-amber-200 hover:text-white cursor-pointer">
                View Launch Banner
            </button>
        </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-emerald-100 px-4 py-3.5 shadow-xs transition-all">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <!-- Brand Logo -->
            <a href="#" class="flex items-center gap-3">
                <img src="asfi_logo_2026.png" alt="ASFI Logo" class="h-12 w-12 object-contain drop-shadow-sm">
                <div>
                    <span class="block text-sm font-black tracking-wider text-slate-900 uppercase leading-none">ASFI DAVAO CITY</span>
                    <span class="text-[10px] font-extrabold text-emerald-700 tracking-wider">AMIS SADAQAH FAMILY INCORPORATED</span>
                </div>
            </a>

            <!-- Desktop Nav Links -->
            <nav class="hidden md:flex items-center gap-7 text-xs font-bold text-slate-700">
                <a href="#about" class="hover:text-emerald-700 transition">About Us</a>
                <a href="#programs" class="hover:text-emerald-700 transition">Programs</a>
                <a href="#impact" class="hover:text-emerald-700 transition">Impact</a>
                <a href="#stories" class="hover:text-emerald-700 transition">Success Stories</a>
                <a href="#faq" class="hover:text-emerald-700 transition">FAQ</a>
                <a href="#contact" class="hover:text-emerald-700 transition">Contact</a>
            </nav>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2.5">
                <button @click="openVolunteerModal()" type="button" class="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 px-4 py-2.5 text-xs font-bold text-sky-800 hover:bg-sky-100 transition shadow-2xs">
                    <i data-lucide="heart-handshake" class="h-4 w-4 text-sky-600"></i>
                    <span>Volunteer</span>
                </button>
                <button @click="openDonateModal()" type="button" class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition active:scale-95 cursor-pointer">
                    <i data-lucide="hand-heart" class="h-4 w-4 text-amber-300"></i>
                    <span>Donate Now</span>
                </button>
            </div>
        </div>
    </header>


    <!-- HERO SECTION -->
    <section class="relative pt-12 pb-20 md:py-24 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/50 overflow-hidden border-b border-emerald-100">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <!-- Left Hero Content -->
                <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div class="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 shadow-2xs">
                        <i data-lucide="sparkles" class="h-3.5 w-3.5 text-amber-600"></i>
                        <span>Takaful & Mutual Community Support</span>
                    </div>

                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                        Empowering Communities Through <span class="emerald-gradient-text">Compassion & Mutual Support</span>
                    </h1>

                    <p class="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                        AMIS Sadaqah Family Incorporated (ASFI) is a modern humanitarian foundation dedicated to uplifting underprivileged families in Davao City and Mindanao through Education Grants, Emergency Medical Relief, Orphan Care, and Disaster Assistance.
                    </p>

                    <div class="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <button @click="openDonateModal()" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl transition active:scale-95 cursor-pointer">
                            <i data-lucide="heart" class="h-4 w-4 text-amber-300"></i>
                            <span>Donate Sadaqah & Zakat</span>
                        </button>
                        <a href="#programs" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-800 shadow-sm hover:bg-slate-50 transition">
                            <span>Explore Our Programs</span>
                            <i data-lucide="chevron-right" class="h-4 w-4 text-emerald-700"></i>
                        </a>
                    </div>

                    <!-- Quick Trust Indicators -->
                    <div class="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center lg:text-left">
                        <div>
                            <span class="block text-2xl md:text-3xl font-black text-emerald-800">100%</span>
                            <span class="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Audited Amanah</span>
                        </div>
                        <div>
                            <span class="block text-2xl md:text-3xl font-black text-amber-600">12,500+</span>
                            <span class="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Lives Touched</span>
                        </div>
                        <div>
                            <span class="block text-2xl md:text-3xl font-black text-sky-700">SEC 2026</span>
                            <span class="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Davao Registered</span>
                        </div>
                    </div>
                </div>

                <!-- Right Hero Visual Card -->
                <div class="lg:col-span-5">
                    <div class="emerald-card p-4 space-y-4">
                        <!-- Hero Image Banner -->
                        <div class="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop" alt="Volunteers helping children" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                            
                            <div class="absolute bottom-4 left-4 right-4 text-white">
                                <span class="inline-block px-3 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider mb-1">Active Community Mission</span>
                                <h3 class="text-base font-extrabold">Davao Family Relief Drive 2026</h3>
                                <p class="text-xs text-slate-200">Delivering food baskets & health support to 450 families.</p>
                            </div>
                        </div>

                        <!-- Featured Program Mini Cards -->
                        <div class="grid grid-cols-2 gap-3">
                            <div class="rounded-xl bg-emerald-50 p-3.5 border border-emerald-200 shadow-2xs">
                                <div class="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
                                    <i data-lucide="graduation-cap" class="h-4 w-4 text-emerald-700"></i>
                                    <span>Education Grants</span>
                                </div>
                                <span class="block text-xs font-bold text-slate-600 mt-1">250+ Active Scholars</span>
                            </div>
                            <div class="rounded-xl bg-sky-50 p-3.5 border border-sky-200 shadow-2xs">
                                <div class="flex items-center gap-2 text-sky-900 font-extrabold text-xs">
                                    <i data-lucide="stethoscope" class="h-4 w-4 text-sky-600"></i>
                                    <span>Medical Aid</span>
                                </div>
                                <span class="block text-xs font-bold text-slate-600 mt-1">1,000+ Patients Helped</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- ABOUT THE FOUNDATION SECTION -->
    <section id="about" class="py-20 bg-white relative border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-800 border border-amber-300">
                    Our Mission & Values
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-slate-900">About ASFI Foundation</h2>
                <p class="text-sm sm:text-base text-slate-600 font-medium">
                    AMIS Sadaqah Family Incorporated (ASFI) was established in Davao City to serve as a beacon of mutual assistance (Takaful), ensuring no family struggles alone during hardship.
                </p>
            </div>

            <!-- 4 Core Pillars Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div class="bg-emerald-50/60 rounded-3xl p-6 space-y-3 border border-emerald-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                        <i data-lucide="shield-check" class="h-6 w-6"></i>
                    </div>
                    <h3 class="text-lg font-extrabold text-slate-900">Amanah (Trust)</h3>
                    <p class="text-xs text-slate-600 leading-relaxed font-medium">
                        Complete financial transparency, audited records, and 100% verified distribution of Sadaqah and Zakat funds.
                    </p>
                </div>

                <div class="bg-sky-50/60 rounded-3xl p-6 space-y-3 border border-sky-200 shadow-xs hover:border-sky-500 hover:shadow-md transition">
                    <div class="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                        <i data-lucide="users" class="h-6 w-6"></i>
                    </div>
                    <h3 class="text-lg font-extrabold text-slate-900">Takaful (Mutual Support)</h3>
                    <p class="text-xs text-slate-600 leading-relaxed font-medium">
                        Rooted in mutual solidarity, community members unite to share burdens and protect vulnerable families.
                    </p>
                </div>

                <div class="bg-amber-50/60 rounded-3xl p-6 space-y-3 border border-amber-200 shadow-xs hover:border-amber-500 hover:shadow-md transition">
                    <div class="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                        <i data-lucide="heart" class="h-6 w-6"></i>
                    </div>
                    <h3 class="text-lg font-extrabold text-slate-900">Ikhlas (Pure Intent)</h3>
                    <p class="text-xs text-slate-600 leading-relaxed font-medium">
                        Serving humanity with unconditional compassion, dignity, and respect for every beneficiary.
                    </p>
                </div>

                <div class="bg-emerald-50/60 rounded-3xl p-6 space-y-3 border border-emerald-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                        <i data-lucide="sparkles" class="h-6 w-6"></i>
                    </div>
                    <h3 class="text-lg font-extrabold text-slate-900">Ukhuwah (Unity)</h3>
                    <p class="text-xs text-slate-600 leading-relaxed font-medium">
                        Strengthening community ties in Davao City by connecting donors, volunteers, and families in a cycle of good.
                    </p>
                </div>

            </div>
        </div>
    </section>


    <!-- OUR PROGRAMS SECTION -->
    <section id="programs" class="py-20 bg-slate-50 relative border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800 border border-emerald-300">
                    Humanitarian Initiatives
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-slate-900">Our Core Programs</h2>
                <p class="text-sm sm:text-base text-slate-600 font-medium">
                    Structured community programs designed to empower underprivileged youth, families, and orphans in Mindanao.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <!-- Program 1: Education Assistance -->
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-emerald-600 hover:shadow-xl transition duration-300">
                    <div class="relative h-48 overflow-hidden bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" alt="Education Assistance" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Education</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition">Education Assistance</h3>
                            <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                Scholarships, learning supplies, school uniforms, and tutoring support for deserving students in Davao City.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
                            <span>250+ Active Scholars</span>
                            <button @click="openProgramModal('Education Assistance')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 2: Medical Assistance -->
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-sky-500 hover:shadow-xl transition duration-300">
                    <div class="relative h-48 overflow-hidden bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop" alt="Medical Assistance" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-sky-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Healthcare</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-black text-slate-900 group-hover:text-sky-700 transition">Medical Assistance</h3>
                            <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                Emergency healthcare grants, prescription medication aid, dialysis support, and hospital bill assistance.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-sky-700">
                            <span>1,000+ Patients Helped</span>
                            <button @click="openProgramModal('Medical Assistance')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 3: Disaster Relief -->
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-amber-500 hover:shadow-xl transition duration-300">
                    <div class="relative h-48 overflow-hidden bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop" alt="Disaster Relief" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Emergency</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-black text-slate-900 group-hover:text-amber-700 transition">Disaster Relief</h3>
                            <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                Rapid deployment of emergency food packs, clean drinking water, hygiene kits, and temporary shelter during calamities.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-700">
                            <span>50+ Relief Missions</span>
                            <button @click="openProgramModal('Disaster Relief')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 4: Livelihood Support -->
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-emerald-600 hover:shadow-xl transition duration-300">
                    <div class="relative h-48 overflow-hidden bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" alt="Livelihood Support" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Livelihood</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition">Livelihood Support</h3>
                            <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                Micro-grants, small business starter kits, and vocational skills training for struggling parents and breadwinners.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
                            <span>120+ Micro-Businesses</span>
                            <button @click="openProgramModal('Livelihood Support')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 5: Orphan & Widow Support -->
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-amber-500 hover:shadow-xl transition duration-300">
                    <div class="relative h-48 overflow-hidden bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" alt="Orphan Support" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Orphan Care</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-black text-slate-900 group-hover:text-amber-700 transition">Orphan & Widow Support</h3>
                            <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                Monthly care stipends, educational backing, nutritional aid, and holistic family counseling for orphans.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-700">
                            <span>180+ Orphans Sponsored</span>
                            <button @click="openProgramModal('Orphan Support')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 6: Community Development -->
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-sky-500 hover:shadow-xl transition duration-300">
                    <div class="relative h-48 overflow-hidden bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=800&auto=format&fit=crop" alt="Community Development" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-sky-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Development</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-black text-slate-900 group-hover:text-sky-700 transition">Community Development</h3>
                            <p class="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                                Installation of community water stations, sanitation facilities, and community center improvements.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-sky-700">
                            <span>15 Water Stations Built</span>
                            <button @click="openProgramModal('Community Development')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- IMPACT STATISTICS COUNTER SECTION (EMERALD BRAND BANNER) -->
    <section id="impact" class="py-16 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white shadow-md">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                
                <div class="space-y-2">
                    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white mb-2 shadow-inner">
                        <i data-lucide="users" class="h-6 w-6"></i>
                    </div>
                    <span class="block text-4xl sm:text-5xl font-black">12,500+</span>
                    <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-100">Beneficiaries Reached</span>
                </div>

                <div class="space-y-2">
                    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-amber-200 mb-2 shadow-inner">
                        <i data-lucide="graduation-cap" class="h-6 w-6"></i>
                    </div>
                    <span class="block text-4xl sm:text-5xl font-black text-amber-300">250+</span>
                    <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-100">Scholarships Granted</span>
                </div>

                <div class="space-y-2">
                    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white mb-2 shadow-inner">
                        <i data-lucide="heart-pulse" class="h-6 w-6"></i>
                    </div>
                    <span class="block text-4xl sm:text-5xl font-black">1,000+</span>
                    <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-100">Medical Aid Cases</span>
                </div>

                <div class="space-y-2">
                    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-amber-200 mb-2 shadow-inner">
                        <i data-lucide="building-2" class="h-6 w-6"></i>
                    </div>
                    <span class="block text-4xl sm:text-5xl font-black text-amber-300">50+</span>
                    <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-100">Community Projects</span>
                </div>

            </div>
        </div>
    </section>


    <!-- HOW YOU CAN HELP SECTION -->
    <section class="py-20 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-800 border border-amber-300">
                    Join Our Cause
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-slate-900">How You Can Help</h2>
                <p class="text-sm sm:text-base text-slate-600 font-medium">
                    Your generosity creates an immediate impact for families and children across Davao City.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <!-- Option 1: Donate -->
                <div class="bg-slate-50 rounded-3xl p-8 text-center border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-xl transition flex flex-col justify-between">
                    <div class="space-y-4">
                        <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-300">
                            <i data-lucide="hand-heart" class="h-8 w-8"></i>
                        </div>
                        <h3 class="text-2xl font-black text-slate-900">Donate Sadaqah & Zakat</h3>
                        <p class="text-xs text-slate-600 leading-relaxed font-medium">
                            Fulfill your Zakat obligations or give Sadaqah to fund scholarships, emergency medical aid, and relief.
                        </p>
                    </div>
                    <button @click="openDonateModal()" class="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition active:scale-95 cursor-pointer">
                        Make a Donation
                    </button>
                </div>

                <!-- Option 2: Volunteer -->
                <div class="bg-slate-50 rounded-3xl p-8 text-center border border-slate-200 shadow-sm hover:border-emerald-600 hover:shadow-xl transition flex flex-col justify-between">
                    <div class="space-y-4">
                        <div class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
                            <i data-lucide="heart-handshake" class="h-8 w-8"></i>
                        </div>
                        <h3 class="text-2xl font-black text-slate-900">Become a Volunteer</h3>
                        <p class="text-xs text-slate-600 leading-relaxed font-medium">
                            Join our community team in Davao City to help distribute food relief, assist in medical drives, and tutor scholars.
                        </p>
                    </div>
                    <button @click="openVolunteerModal()" class="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition active:scale-95 cursor-pointer">
                        Join as Volunteer
                    </button>
                </div>

                <!-- Option 3: Partner -->
                <div class="bg-slate-50 rounded-3xl p-8 text-center border border-slate-200 shadow-sm hover:border-sky-500 hover:shadow-xl transition flex flex-col justify-between">
                    <div class="space-y-4">
                        <div class="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto border border-sky-300">
                            <i data-lucide="building-2" class="h-8 w-8"></i>
                        </div>
                        <h3 class="text-2xl font-black text-slate-900">Partner With Us</h3>
                        <p class="text-xs text-slate-600 leading-relaxed font-medium">
                            Collaborate with ASFI as a corporate CSR partner, educational institution, or NGO to multiply community impact.
                        </p>
                    </div>
                    <a href="#contact" class="w-full mt-6 inline-block bg-sky-600 hover:bg-sky-700 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition">
                        Partner Inquiries
                    </a>
                </div>

            </div>
        </div>
    </section>


    <!-- SUCCESS STORIES SECTION -->
    <section id="stories" class="py-20 bg-slate-50 border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800 border border-emerald-300">
                    Real Impact
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-slate-900">Success Stories</h2>
                <p class="text-sm sm:text-base text-slate-600 font-medium">
                    Read how your generosity creates lasting transformation for students and families.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <!-- Story 1 -->
                <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
                    <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop" alt="Scholar Story" class="w-28 h-28 rounded-2xl object-cover border-2 border-emerald-600 shrink-0">
                    <div class="space-y-2">
                        <div class="flex items-center gap-1 text-amber-500">
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                        </div>
                        <p class="text-xs text-slate-700 italic leading-relaxed font-medium">
                            "Without the ASFI Education Scholarship, continuing my Grade 11 studies in Davao would have been impossible. Alhamdulillāh, now I can pursue my dream of becoming an educator."
                        </p>
                        <h4 class="text-sm font-black text-slate-900">Fatima Z. — ASFI Scholar 2026</h4>
                        <span class="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">Education Assistance Program</span>
                    </div>
                </div>

                <!-- Story 2 -->
                <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" alt="Medical Aid Story" class="w-28 h-28 rounded-2xl object-cover border-2 border-sky-500 shrink-0">
                    <div class="space-y-2">
                        <div class="flex items-center gap-1 text-amber-500">
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                            <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                        </div>
                        <p class="text-xs text-slate-700 italic leading-relaxed font-medium">
                            "When my husband required urgent dialysis treatment, ASFI stepped in with emergency medical assistance within 24 hours. May Allāh reward the donors continuously."
                        </p>
                        <h4 class="text-sm font-black text-slate-900">Mariam S. — Beneficiary Family</h4>
                        <span class="text-[10px] font-extrabold text-sky-700 uppercase tracking-wider">Medical Aid Assistance</span>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- FAQ ACCORDION SECTION -->
    <section id="faq" class="py-20 bg-white relative border-b border-slate-200">
        <div class="max-w-4xl mx-auto px-4">
            <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800 border border-emerald-300">
                    Got Questions?
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-slate-900">Frequently Asked Questions</h2>
            </div>

            <div class="space-y-4" x-data="{ openFaq: 1 }">
                
                <div class="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    <button @click="openFaq = (openFaq === 1 ? 0 : 1)" class="w-full p-5 text-left flex items-center justify-between font-black text-slate-900 text-sm cursor-pointer">
                        <span>How are ASFI Sadaqah and Zakat funds verified and audited?</span>
                        <i data-lucide="chevron-down" class="h-4 w-4 text-emerald-700 transition-transform" :class="openFaq === 1 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="openFaq === 1" x-collapse class="px-5 pb-5 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200 pt-3">
                        ASFI operates under strict Amanah (Trust) principles. 100% of designated Zakat funds are disbursed directly to eligible beneficiaries (Asnaf). We maintain audited accounting records and publish transparency reports.
                    </div>
                </div>

                <div class="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    <button @click="openFaq = (openFaq === 2 ? 0 : 2)" class="w-full p-5 text-left flex items-center justify-between font-black text-slate-900 text-sm cursor-pointer">
                        <span>Who is eligible for ASFI Education Scholarships?</span>
                        <i data-lucide="chevron-down" class="h-4 w-4 text-emerald-700 transition-transform" :class="openFaq === 2 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="openFaq === 2" x-collapse class="px-5 pb-5 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200 pt-3">
                        Students enrolled in Kinder to Grade 12 or college programs in Davao City who come from low-income families or orphan backgrounds can apply for education assistance through our portal.
                    </div>
                </div>

                <div class="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    <button @click="openFaq = (openFaq === 3 ? 0 : 3)" class="w-full p-5 text-left flex items-center justify-between font-black text-slate-900 text-sm cursor-pointer">
                        <span>How can a family request Emergency Medical Assistance?</span>
                        <i data-lucide="chevron-down" class="h-4 w-4 text-emerald-700 transition-transform" :class="openFaq === 3 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="openFaq === 3" x-collapse class="px-5 pb-5 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200 pt-3">
                        Families can submit a medical assistance request by filling out our online form or visiting our Davao City office with a valid medical prescription/abstract and proof of identity.
                    </div>
                </div>

                <div class="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    <button @click="openFaq = (openFaq === 4 ? 0 : 4)" class="w-full p-5 text-left flex items-center justify-between font-black text-slate-900 text-sm cursor-pointer">
                        <span>What payment methods are supported for donations?</span>
                        <i data-lucide="chevron-down" class="h-4 w-4 text-emerald-700 transition-transform" :class="openFaq === 4 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="openFaq === 4" x-collapse class="px-5 pb-5 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200 pt-3">
                        We accept GCash online transfer, QR Ph instant scanning, and direct bank transfers (BDO / BPI). All donors receive an official digital receipt.
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- CONTACT & OFFICE LOCATIONS SECTION -->
    <section id="contact" class="py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <!-- Contact Info -->
                <div class="lg:col-span-5 space-y-6">
                    <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800 border border-emerald-300">
                        Get In Touch
                    </span>
                    <h2 class="text-3xl font-black text-slate-900">Contact ASFI Foundation</h2>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        Have questions about our programs, sponsorships, or volunteering? Reach out to our Davao City team today.
                    </p>

                    <div class="space-y-4 pt-2">
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-300">
                                <i data-lucide="map-pin" class="h-5 w-5"></i>
                            </div>
                            <div>
                                <h4 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Headquarters Location</h4>
                                <p class="text-xs text-slate-600 mt-0.5 font-medium">AMIS Sadaqah Family Inc., Davao City, 8000 Philippines</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300">
                                <i data-lucide="clock" class="h-5 w-5"></i>
                            </div>
                            <div>
                                <h4 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Office Hours</h4>
                                <p class="text-xs text-slate-600 mt-0.5 font-medium">Saturday to Thursday: 8:00 AM – 4:00 PM</p>
                                <span class="text-[10px] font-bold text-rose-600 uppercase">Friday: Closed</span>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 border border-sky-300">
                                <i data-lucide="mail" class="h-5 w-5"></i>
                            </div>
                            <div>
                                <h4 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Email Address</h4>
                                <p class="text-xs text-emerald-700 font-bold mt-0.5">asfi@amis.edu.ph</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Inquiry Form -->
                <div class="lg:col-span-7">
                    <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                        <h3 class="text-xl font-black text-slate-900 mb-4">Send Us a Message</h3>
                        <form @submit.prevent="submitContactForm()" class="space-y-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[11px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">Your Full Name</label>
                                    <input type="text" x-model="contactForm.name" required placeholder="e.g. Ahmad Baulo" class="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none">
                                </div>
                                <div>
                                    <label class="block text-[11px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">Email Address</label>
                                    <input type="email" x-model="contactForm.email" required placeholder="e.g. ahmad@example.com" class="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none">
                                </div>
                            </div>
                            <div>
                                <label class="block text-[11px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">Subject / Purpose</label>
                                <select x-model="contactForm.subject" required class="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none">
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
                                <textarea x-model="contactForm.message" rows="4" required placeholder="Write your message here..." class="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none"></textarea>
                            </div>
                            <button type="submit" class="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition active:scale-95 cursor-pointer">
                                Send Message
                            </button>
                            <p x-show="contactSent" x-cloak class="text-xs text-emerald-700 font-black text-center mt-2">
                                JazakAllahu Khairan! Message sent successfully. Our team will contact you shortly.
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- FOOTER -->
    <footer class="bg-slate-900 text-slate-300 text-xs py-12">
        <div class="max-w-7xl mx-auto px-4 space-y-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-3">
                    <img src="asfi_logo_2026.png" alt="ASFI Logo" class="h-10 w-10 object-contain">
                    <div>
                        <span class="block text-sm font-black text-white uppercase">ASFI DAVAO CITY 2026</span>
                        <span class="text-[10px] text-amber-400 font-bold">AMIS SADAQAH FAMILY INCORPORATED</span>
                    </div>
                </div>
                <div class="flex items-center gap-6 font-bold text-slate-300">
                    <a href="#about" class="hover:text-amber-400">About</a>
                    <a href="#programs" class="hover:text-amber-400">Programs</a>
                    <a href="#impact" class="hover:text-amber-400">Impact</a>
                    <a href="#faq" class="hover:text-amber-400">FAQ</a>
                    <a href="#contact" class="hover:text-amber-400">Contact</a>
                </div>
            </div>
            
            <div class="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
                <p>© 2026 AMIS Sadaqah Family Incorporated (ASFI) - Davao City, Philippines. All Rights Reserved.</p>
                <p class="text-emerald-400 font-bold">Takaful & Mutual Support</p>
            </div>
        </div>
    </footer>


    <!-- =================================================================== -->
    <!-- MODALS: DONATE MODAL -->
    <!-- =================================================================== -->
    <div x-show="donateModal" x-cloak class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative space-y-4 my-auto border border-emerald-200" @click.outside="donateModal = false">
            <button @click="donateModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                <i data-lucide="x" class="h-5 w-5"></i>
            </button>

            <div class="text-center space-y-1">
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2 font-bold">
                    <i data-lucide="hand-heart" class="h-6 w-6"></i>
                </div>
                <h3 class="text-xl font-black text-slate-900">Make a Contribution</h3>
                <p class="text-xs text-slate-500 font-medium">Support ASFI foundation programs through Sadaqah or Zakat.</p>
            </div>

            <!-- Donation Type Selection -->
            <div class="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl font-black text-xs">
                <button type="button" @click="donationType = 'Sadaqah'" :class="donationType === 'Sadaqah' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600'" class="py-2.5 rounded-lg transition">Sadaqah (Voluntary)</button>
                <button type="button" @click="donationType = 'Zakat'" :class="donationType === 'Zakat' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600'" class="py-2.5 rounded-lg transition">Zakat (Obligatory)</button>
            </div>

            <!-- Payment Details -->
            <div class="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-medium">
                <h4 class="font-black text-slate-900 uppercase text-[10px] tracking-wider">Official Bank & GCash Accounts (ASFI Davao)</h4>
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span class="font-bold text-slate-700">GCash Transfer:</span>
                    <span class="font-mono font-black text-emerald-700">09XX-XXX-XXXX</span>
                </div>
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span class="font-bold text-slate-700">Bank Account (BDO):</span>
                    <span class="font-mono font-black text-slate-900">0012-3456-7890</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-700">Account Name:</span>
                    <span class="font-bold text-slate-900">AMIS Sadaqah Family Inc.</span>
                </div>
            </div>

            <p class="text-[11px] text-slate-500 text-center font-medium">
                JazakAllahu Khairan for your generosity. May Allāh bless and increase your wealth.
            </p>

            <button @click="donateModal = false" class="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs cursor-pointer">
                Close Window
            </button>
        </div>
    </div>


    <!-- =================================================================== -->
    <!-- MODALS: VOLUNTEER MODAL -->
    <!-- =================================================================== -->
    <div x-show="volunteerModal" x-cloak class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative space-y-4 my-auto border border-emerald-200" @click.outside="volunteerModal = false">
            <button @click="volunteerModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                <i data-lucide="x" class="h-5 w-5"></i>
            </button>

            <div class="text-center space-y-1">
                <div class="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2 font-bold">
                    <i data-lucide="heart-handshake" class="h-6 w-6"></i>
                </div>
                <h3 class="text-xl font-black text-slate-900">Join ASFI Volunteers</h3>
                <p class="text-xs text-slate-500 font-medium">Become a volunteer for community outreaches in Davao City.</p>
            </div>

            <form @submit.prevent="submitVolunteer()" class="space-y-3 text-xs font-medium">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input type="text" required placeholder="Your full name" class="w-full rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:border-emerald-600">
                </div>
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Mobile / WhatsApp</label>
                    <input type="text" required placeholder="09XX-XXX-XXXX" class="w-full rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:border-emerald-600">
                </div>
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Area of Interest</label>
                    <select class="w-full rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:border-emerald-600">
                        <option>Community Food Relief Drives</option>
                        <option>Medical Mission Assistant</option>
                        <option>Scholar Tutoring & Education</option>
                        <option>Disaster Emergency Response</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-emerald-700 text-white py-3 rounded-xl font-black text-xs uppercase shadow-md cursor-pointer">
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

                dismissComingSoon() {
                    this.showComingSoon = false;
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
