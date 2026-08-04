<?php
// ============================================================================
// ASFI - AMIS SADAQAH FAMILY INCORPORATED (DAVAO CITY 2026)
// Official Web Application & Launch Preview Portal
// Tagline: Empowering Communities Through Compassion and Mutual Support.
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
                            950: '#022c22',
                        },
                        amber: {
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
        body { font-family: 'Outfit', sans-serif; background-color: #022c22; color: #f8fafc; }
        
        /* Islamic Geometric Background Overlay */
        .bg-islamic-pattern {
            background-color: #022c22;
            background-image: radial-gradient(rgba(16, 185, 129, 0.12) 1px, transparent 1px), radial-gradient(rgba(245, 158, 11, 0.08) 1px, #022c22 1px);
            background-size: 40px 40px;
            background-position: 0 0, 20px 20px;
        }

        /* Glassmorphism utility */
        .glass-card {
            background: rgba(4, 120, 87, 0.25);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(52, 211, 153, 0.2);
        }

        .glass-card-light {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .gold-gradient-text {
            background: linear-gradient(135deg, #fbbf24 0%, #d97706 50%, #f59e0b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .rainbow-halo {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(245, 158, 11, 0.2);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #022c22; }
        ::-webkit-scrollbar-thumb { background: #047857; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #10b981; }
    </style>
</head>
<body x-data="asfiApp()" class="bg-islamic-pattern min-h-screen selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">

    <!-- =================================================================== -->
    <!-- 1. COMING SOON INSHAALLAH LOADING / SPLASH LAYER OVERLAY -->
    <!-- =================================================================== -->
    <div x-show="showComingSoon"
         x-transition:leave="transition ease-in-out duration-700 transform"
         x-transition:leave-start="opacity-100 scale-100"
         x-transition:leave-end="opacity-0 scale-95"
         class="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 overflow-y-auto">
        
        <!-- Top Bar inside Coming Soon Splash -->
        <header class="max-w-6xl mx-auto w-full flex items-center justify-between py-2">
            <div class="flex items-center gap-3">
                <img src="asfi_logo_2026.png" alt="ASFI Logo" class="h-12 w-12 object-contain drop-shadow-md">
                <div>
                    <h1 class="text-sm font-black tracking-wider text-white uppercase">AMIS SADAQAH FAMILY INC.</h1>
                    <p class="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Davao City 2026</p>
                </div>
            </div>
            
            <button @click="dismissComingSoon()" type="button" class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/80 px-4 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900 hover:text-white cursor-pointer shadow-lg">
                <span>Explore Site Preview</span>
                <i data-lucide="arrow-down-right" class="h-4 w-4"></i>
            </button>
        </header>

        <!-- Center Content: Coming Soon InshaAllah -->
        <main class="max-w-3xl mx-auto w-full text-center my-auto py-8 px-4 space-y-6">
            
            <!-- Arabic Bismillah Calligraphy Banner -->
            <div class="space-y-2">
                <p class="font-arabic text-2xl md:text-3xl text-emerald-300 tracking-wide">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-300 border border-emerald-500/40">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Official Portal Launching Soon</span>
                </span>
            </div>

            <!-- Big Logo Display -->
            <div class="relative inline-block my-4">
                <div class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-indigo-500 blur-2xl opacity-40 animate-pulse"></div>
                <img src="asfi_logo_2026.png" alt="ASFI Logo" class="relative h-40 w-40 md:h-48 md:w-48 mx-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300">
            </div>

            <!-- Headline & Tagline -->
            <div class="space-y-3">
                <h2 class="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    Coming Soon <span class="gold-gradient-text">InshaAllah</span>
                </h2>
                <p class="text-base md:text-xl font-bold text-emerald-200 italic max-w-xl mx-auto">
                    "Empowering Communities Through Compassion and Mutual Support."
                </p>
                <p class="text-xs md:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                    We are building a comprehensive digital foundation platform for ASFI Davao City 2026 to support education assistance, medical aid, orphan care, and emergency relief under Takaful principles.
                </p>
            </div>

            <!-- Interactive Countdown Timer -->
            <div class="grid grid-cols-4 gap-3 max-w-md mx-auto pt-2">
                <div class="glass-card rounded-2xl p-3 text-center border border-emerald-500/30">
                    <span class="block text-2xl md:text-3xl font-black text-white" x-text="countdown.days">00</span>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Days</span>
                </div>
                <div class="glass-card rounded-2xl p-3 text-center border border-emerald-500/30">
                    <span class="block text-2xl md:text-3xl font-black text-white" x-text="countdown.hours">00</span>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Hours</span>
                </div>
                <div class="glass-card rounded-2xl p-3 text-center border border-emerald-500/30">
                    <span class="block text-2xl md:text-3xl font-black text-white" x-text="countdown.minutes">00</span>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Minutes</span>
                </div>
                <div class="glass-card rounded-2xl p-3 text-center border border-emerald-500/30">
                    <span class="block text-2xl md:text-3xl font-black text-white" x-text="countdown.seconds">00</span>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Seconds</span>
                </div>
            </div>

            <!-- Get Notified Subscription Form -->
            <div class="pt-4 max-w-md mx-auto">
                <form @submit.prevent="subscribeNewsletter()" class="flex flex-col sm:flex-row gap-2">
                    <input type="email" x-model="subscriberEmail" required placeholder="Enter your email address..." class="flex-1 rounded-xl bg-slate-900/90 border border-emerald-500/40 px-4 py-3 text-xs text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400">
                    <button type="submit" class="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition active:scale-95 cursor-pointer whitespace-nowrap">
                        Notify Me
                    </button>
                </form>
                <p x-show="subscribed" x-cloak class="text-xs font-bold text-amber-400 mt-2">
                    JazakAllahu Khairan! We will notify you on launch day.
                </p>
            </div>

            <!-- Explore Preview Button -->
            <div class="pt-4">
                <button @click="dismissComingSoon()" type="button" class="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-sm font-black uppercase tracking-wider text-slate-950 shadow-2xl transition hover:from-amber-400 hover:to-amber-500 hover:scale-105 active:scale-95 cursor-pointer">
                    <span>Preview Foundation Web App</span>
                    <i data-lucide="arrow-down" class="h-4 w-4"></i>
                </button>
            </div>
        </main>

        <!-- Footer inside Coming Soon -->
        <footer class="max-w-6xl mx-auto w-full text-center text-[11px] text-slate-400 py-2 border-t border-slate-800">
            <p>© 2026 AMIS Sadaqah Family Incorporated (ASFI) - Davao City, Philippines. All Rights Reserved.</p>
        </footer>
    </div>


    <!-- =================================================================== -->
    <!-- 2. MAIN WEBSITE APP (FULL INTERACTIVE PORTAL) -->
    <!-- =================================================================== -->
    
    <!-- Top Sticky Preview Notification Banner -->
    <div x-show="!showComingSoon" x-cloak class="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 border-b border-emerald-500/30 px-4 py-2 text-xs font-bold text-emerald-200 text-center flex items-center justify-between">
        <div class="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
                <span class="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>✨ Previewing ASFI Web Application Concept & Roadmap (Davao City 2026)</span>
            </div>
            <button @click="showComingSoon = true" class="text-[11px] font-black uppercase underline text-amber-400 hover:text-amber-300 cursor-pointer">
                View Launch Banner
            </button>
        </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/20 px-4 py-3.5 transition-all">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <!-- Brand Logo -->
            <a href="#" class="flex items-center gap-3">
                <img src="asfi_logo_2026.png" alt="ASFI Logo" class="h-11 w-11 object-contain drop-shadow-md">
                <div>
                    <span class="block text-sm font-black tracking-wider text-white uppercase leading-none">ASFI DAVAO CITY</span>
                    <span class="text-[10px] font-extrabold text-amber-400 tracking-wider">SADAQAH FAMILY INC.</span>
                </div>
            </a>

            <!-- Desktop Nav Links -->
            <nav class="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
                <a href="#about" class="hover:text-amber-400 transition">About Us</a>
                <a href="#programs" class="hover:text-amber-400 transition">Programs</a>
                <a href="#impact" class="hover:text-amber-400 transition">Our Impact</a>
                <a href="#stories" class="hover:text-amber-400 transition">Success Stories</a>
                <a href="#faq" class="hover:text-amber-400 transition">FAQ</a>
                <a href="#contact" class="hover:text-amber-400 transition">Contact</a>
            </nav>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2.5">
                <button @click="openVolunteerModal()" type="button" class="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900 hover:text-white transition">
                    <i data-lucide="heart-handshake" class="h-4 w-4 text-emerald-400"></i>
                    <span>Volunteer</span>
                </button>
                <button @click="openDonateModal()" type="button" class="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg hover:from-amber-400 hover:to-amber-500 transition active:scale-95 cursor-pointer">
                    <i data-lucide="hand-heart" class="h-4 w-4"></i>
                    <span>Donate Now</span>
                </button>
            </div>
        </div>
    </header>


    <!-- HERO SECTION -->
    <section class="relative pt-12 pb-20 md:py-28 overflow-hidden">
        <!-- Background Ambient Glows -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none"></div>
        <div class="absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <!-- Left Hero Content -->
                <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-300 backdrop-blur-md">
                        <i data-lucide="sparkles" class="h-3.5 w-3.5 text-amber-400"></i>
                        <span>Takaful & Mutual Community Support</span>
                    </div>

                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                        Empowering Communities Through <span class="gold-gradient-text">Compassion & Mutual Support</span>
                    </h1>

                    <p class="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                        AMIS Sadaqah Family Incorporated (ASFI) is dedicated to uplifting underprivileged families in Davao City and Mindanao through education assistance, emergency medical grants, orphan care, and disaster relief.
                    </p>

                    <div class="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <button @click="openDonateModal()" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl hover:from-emerald-400 hover:to-emerald-500 transition active:scale-95 cursor-pointer">
                            <i data-lucide="heart" class="h-4 w-4 text-rose-300"></i>
                            <span>Support Our Programs</span>
                        </button>
                        <a href="#about" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-7 py-4 text-sm font-bold text-slate-200 hover:border-emerald-500/50 hover:bg-slate-800 transition">
                            <span>Learn About ASFI</span>
                            <i data-lucide="chevron-right" class="h-4 w-4"></i>
                        </a>
                    </div>

                    <!-- Quick Trust Indicators -->
                    <div class="pt-6 border-t border-emerald-900/60 grid grid-cols-3 gap-4 text-center lg:text-left">
                        <div>
                            <span class="block text-2xl font-black text-white">100%</span>
                            <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Amanah & Verified</span>
                        </div>
                        <div>
                            <span class="block text-2xl font-black text-amber-400">12,500+</span>
                            <span class="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Lives Touched</span>
                        </div>
                        <div>
                            <span class="block text-2xl font-black text-white">SEC 2026</span>
                            <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Davao Registered</span>
                        </div>
                    </div>
                </div>

                <!-- Right Hero Visual Card -->
                <div class="lg:col-span-5">
                    <div class="relative">
                        <!-- Decorative Frame Ring -->
                        <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 via-amber-400 to-indigo-500 blur-md opacity-30"></div>
                        
                        <div class="relative rounded-3xl overflow-hidden glass-card p-4 space-y-4">
                            <!-- Hero Image Banner -->
                            <div class="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-900">
                                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop" alt="Volunteers helping children" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                                
                                <div class="absolute bottom-4 left-4 right-4 text-white">
                                    <span class="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500 text-[10px] font-black uppercase tracking-wider mb-1">Active Outreach</span>
                                    <h3 class="text-base font-bold">Davao City Family Relief Drive 2026</h3>
                                    <p class="text-xs text-slate-300">Providing food baskets & medical checkups to 450 families.</p>
                                </div>
                            </div>

                            <!-- Featured Program Mini Grid -->
                            <div class="grid grid-cols-2 gap-3">
                                <div class="rounded-xl bg-slate-900/80 p-3 border border-emerald-500/20">
                                    <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                                        <i data-lucide="graduation-cap" class="h-4 w-4"></i>
                                        <span>Education Grants</span>
                                    </div>
                                    <span class="block text-xs font-medium text-slate-300 mt-1">250+ Scholars Enrolled</span>
                                </div>
                                <div class="rounded-xl bg-slate-900/80 p-3 border border-amber-500/20">
                                    <div class="flex items-center gap-2 text-amber-400 font-bold text-xs">
                                        <i data-lucide="stethoscope" class="h-4 w-4"></i>
                                        <span>Medical Aid</span>
                                    </div>
                                    <span class="block text-xs font-medium text-slate-300 mt-1">1,000+ Cases Assisted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- ABOUT THE FOUNDATION SECTION -->
    <section id="about" class="py-20 bg-slate-950/60 border-y border-emerald-900/40 relative">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-400 border border-amber-400/20">
                    Our Mission & Principles
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-white">About ASFI Foundation</h2>
                <p class="text-sm sm:text-base text-slate-300 font-medium">
                    AMIS Sadaqah Family Incorporated (ASFI) was established in Davao City to serve as a beacon of hope and mutual assistance (Takaful), ensuring no family is left behind in times of hardship.
                </p>
            </div>

            <!-- 4 Core Pillars Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div class="glass-card rounded-3xl p-6 space-y-3 transition hover:-translate-y-1 hover:border-emerald-400/50">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/30">
                        <i data-lucide="shield-check" class="h-6 w-6"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white">Amanah (Trust)</h3>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        We operate with complete financial transparency, rigorous accounting, and 100% verified allocation of Sadaqah and Zakat funds.
                    </p>
                </div>

                <div class="glass-card rounded-3xl p-6 space-y-3 transition hover:-translate-y-1 hover:border-amber-400/50">
                    <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl border border-amber-500/30">
                        <i data-lucide="users" class="h-6 w-6"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white">Takaful (Mutual Support)</h3>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Rooted in mutual solidarity, community members unite to share burdens and protect vulnerable families against financial distress.
                    </p>
                </div>

                <div class="glass-card rounded-3xl p-6 space-y-3 transition hover:-translate-y-1 hover:border-emerald-400/50">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/30">
                        <i data-lucide="heart" class="h-6 w-6"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white">Ikhlas (Pure Intent)</h3>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Serving humanity with unconditional compassion, dignity, and respect, regardless of background or status.
                    </p>
                </div>

                <div class="glass-card rounded-3xl p-6 space-y-3 transition hover:-translate-y-1 hover:border-amber-400/50">
                    <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl border border-amber-500/30">
                        <i data-lucide="sparkles" class="h-6 w-6"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white">Ukhuwah (Unity)</h3>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Building strong community bonds in Davao City by connecting donors, volunteers, and beneficiaries in a cycle of good.
                    </p>
                </div>

            </div>
        </div>
    </section>


    <!-- OUR PROGRAMS SECTION -->
    <section id="programs" class="py-20 relative">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-300 border border-emerald-500/40">
                    Comprehensive Support
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-white">Our Key Programs</h2>
                <p class="text-sm sm:text-base text-slate-300 font-medium">
                    Through structured community initiatives, ASFI addresses critical needs in education, healthcare, disaster response, and orphan care.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <!-- Program 1: Education Assistance -->
                <div class="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-emerald-400/60 transition">
                    <div class="relative h-48 overflow-hidden bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" alt="Education Assistance" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">Education</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition">Education Assistance</h3>
                            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                                Providing full and partial academic scholarships, learning kits, school supplies, and technological tools for deserving youth in Davao.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-emerald-900/60 flex items-center justify-between text-xs font-bold text-emerald-400">
                            <span>250+ Active Scholars</span>
                            <button @click="openProgramModal('Education Assistance')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 2: Medical Assistance -->
                <div class="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-amber-400/60 transition">
                    <div class="relative h-48 overflow-hidden bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop" alt="Medical Assistance" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">Healthcare</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition">Medical Assistance</h3>
                            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                                Emergency healthcare grants, prescription medication aid, dialysis support, and hospital bill assistance for low-income patients.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-emerald-900/60 flex items-center justify-between text-xs font-bold text-amber-400">
                            <span>1,000+ Patients Helped</span>
                            <button @click="openProgramModal('Medical Assistance')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 3: Disaster Relief -->
                <div class="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-emerald-400/60 transition">
                    <div class="relative h-48 overflow-hidden bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop" alt="Disaster Relief" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">Emergency</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition">Disaster Relief</h3>
                            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                                Rapid deployment of emergency food packs, clean drinking water, hygiene kits, and temporary shelter during floods and natural disasters.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-emerald-900/60 flex items-center justify-between text-xs font-bold text-emerald-400">
                            <span>50+ Relief Missions</span>
                            <button @click="openProgramModal('Disaster Relief')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 4: Livelihood Support -->
                <div class="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-amber-400/60 transition">
                    <div class="relative h-48 overflow-hidden bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" alt="Livelihood Support" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">Livelihood</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition">Livelihood Support</h3>
                            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                                Micro-grants, small business starter kits, and vocational skills training for struggling parents and single mothers.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-emerald-900/60 flex items-center justify-between text-xs font-bold text-emerald-400">
                            <span>120+ Micro-Businesses</span>
                            <button @click="openProgramModal('Livelihood Support')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 5: Orphan & Widow Care -->
                <div class="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-emerald-400/60 transition">
                    <div class="relative h-48 overflow-hidden bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" alt="Orphan Care" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">Orphan Care</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition">Orphan & Widow Care</h3>
                            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                                Comprehensive monthly stipends, educational support, nutritional aid, and emotional care for orphans and widows.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-emerald-900/60 flex items-center justify-between text-xs font-bold text-amber-400">
                            <span>180+ Orphans Sponsored</span>
                            <button @click="openProgramModal('Orphan & Widow Care')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

                <!-- Program 6: Community Water & Welfare -->
                <div class="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-amber-400/60 transition">
                    <div class="relative h-48 overflow-hidden bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=800&auto=format&fit=crop" alt="Clean Water & Welfare" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">Infrastructure</span>
                    </div>
                    <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition">Clean Water & Community Welfare</h3>
                            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                                Installation of community water pumps, sanitary facilities, and community feeding stations in remote Davao areas.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-emerald-900/60 flex items-center justify-between text-xs font-bold text-emerald-400">
                            <span>15 Water Stations Built</span>
                            <button @click="openProgramModal('Clean Water & Welfare')" class="hover:underline flex items-center gap-1 cursor-pointer">Learn More →</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- OUR IMPACT STATS COUNTER SECTION -->
    <section id="impact" class="py-16 bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border-y border-emerald-500/30">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                
                <div class="space-y-2">
                    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-2">
                        <i data-lucide="users" class="h-6 w-6"></i>
                    </div>
                    <span class="block text-4xl sm:text-5xl font-black text-white">12,500+</span>
                    <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Beneficiaries Reached</span>
                </div>

                <div class="space-y-2">
                    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 mb-2">
                        <i data-lucide="graduation-cap" class="h-6 w-6"></i>
                    </div>
                    <span class="block text-4xl sm:text-5xl font-black text-amber-400">250+</span>
                    <span class="text-xs font-extrabold uppercase tracking-wider text-slate-300">Scholarships Granted</span>
                </div>

                <div class="space-y-2">
                    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-2">
                        <i data-lucide="heart-pulse" class="h-6 w-6"></i>
                    </div>
                    <span class="block text-4xl sm:text-5xl font-black text-white">1,000+</span>
                    <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Medical Aid Cases</span>
                </div>

                <div class="space-y-2">
                    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 mb-2">
                        <i data-lucide="building-2" class="h-6 w-6"></i>
                    </div>
                    <span class="block text-4xl sm:text-5xl font-black text-amber-400">50+</span>
                    <span class="text-xs font-extrabold uppercase tracking-wider text-slate-300">Community Projects</span>
                </div>

            </div>
        </div>
    </section>


    <!-- HOW YOU CAN HELP SECTION -->
    <section class="py-20 relative">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-400 border border-amber-400/20">
                    Join Our Mission
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-white">How You Can Help</h2>
                <p class="text-sm sm:text-base text-slate-300 font-medium">
                    Every donation and volunteer hour creates a lasting ripple of hope for families in Davao City.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <!-- Option 1: Donate -->
                <div class="glass-card rounded-3xl p-8 space-y-4 text-center border border-amber-500/30 hover:border-amber-400 transition flex flex-col justify-between">
                    <div class="space-y-4">
                        <div class="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                            <i data-lucide="hand-heart" class="h-8 w-8"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-white">Donate Sadaqah & Zakat</h3>
                        <p class="text-xs text-slate-300 leading-relaxed">
                            Fulfill your Zakat obligations or give Sadaqah to fund education scholarships, medical grants, and food packs.
                        </p>
                    </div>
                    <button @click="openDonateModal()" class="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition active:scale-95 cursor-pointer">
                        Make a Donation
                    </button>
                </div>

                <!-- Option 2: Volunteer -->
                <div class="glass-card rounded-3xl p-8 space-y-4 text-center border border-emerald-500/30 hover:border-emerald-400 transition flex flex-col justify-between">
                    <div class="space-y-4">
                        <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                            <i data-lucide="heart-handshake" class="h-8 w-8"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-white">Become a Volunteer</h3>
                        <p class="text-xs text-slate-300 leading-relaxed">
                            Join our community team in Davao City to help distribute food relief, assist in medical missions, and tutor scholars.
                        </p>
                    </div>
                    <button @click="openVolunteerModal()" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition active:scale-95 cursor-pointer border border-emerald-400/40">
                        Join as Volunteer
                    </button>
                </div>

                <!-- Option 3: Partner -->
                <div class="glass-card rounded-3xl p-8 space-y-4 text-center border border-indigo-500/30 hover:border-indigo-400 transition flex flex-col justify-between">
                    <div class="space-y-4">
                        <div class="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
                            <i data-lucide="building-2" class="h-8 w-8"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-white">Partner With Us</h3>
                        <p class="text-xs text-slate-300 leading-relaxed">
                            Collaborate with ASFI as a corporate CSR partner, educational institution, or NGO to multiply our community impact.
                        </p>
                    </div>
                    <a href="#contact" class="w-full inline-block bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider border border-slate-700 transition">
                        Partner Inquiries
                    </a>
                </div>

            </div>
        </div>
    </section>


    <!-- SUCCESS STORIES SECTION -->
    <section id="stories" class="py-20 bg-slate-950/70 border-t border-emerald-900/40">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-300 border border-emerald-500/40">
                    Real Lives Transformed
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-white">Success Stories</h2>
                <p class="text-sm sm:text-base text-slate-300 font-medium">
                    Read how your generosity creates lasting changes in the lives of our scholars and families.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <!-- Story 1 -->
                <div class="glass-card rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center">
                    <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop" alt="Scholar Story" class="w-28 h-28 rounded-2xl object-cover border-2 border-amber-400 shrink-0">
                    <div class="space-y-2">
                        <div class="flex items-center gap-1 text-amber-400">
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                        </div>
                        <p class="text-xs text-slate-200 italic leading-relaxed">
                            "Without the ASFI Education Scholarship, continuing my Grade 11 studies in Davao would have been impossible. Alhamdulillāh, now I can pursue my dream of becoming an educator."
                        </p>
                        <h4 class="text-sm font-bold text-white">Fatima Z. — ASFI Scholar 2026</h4>
                        <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Education Assistance Program</span>
                    </div>
                </div>

                <!-- Story 2 -->
                <div class="glass-card rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" alt="Medical Aid Story" class="w-28 h-28 rounded-2xl object-cover border-2 border-emerald-400 shrink-0">
                    <div class="space-y-2">
                        <div class="flex items-center gap-1 text-amber-400">
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                            <i data-lucide="star" class="h-3.5 w-3.5 fill-current"></i>
                        </div>
                        <p class="text-xs text-slate-200 italic leading-relaxed">
                            "When my husband required urgent dialysis treatment, ASFI stepped in with emergency medical assistance within 24 hours. May Allāh reward the donors continuously."
                        </p>
                        <h4 class="text-sm font-bold text-white">Mariam S. — Beneficiary Family</h4>
                        <span class="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Medical Aid Assistance</span>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- FAQ ACCORDION SECTION -->
    <section id="faq" class="py-20 relative">
        <div class="max-w-4xl mx-auto px-4">
            <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-400 border border-amber-400/20">
                    Got Questions?
                </span>
                <h2 class="text-3xl sm:text-4xl font-black text-white">Frequently Asked Questions</h2>
            </div>

            <div class="space-y-4" x-data="{ openFaq: 1 }">
                
                <div class="glass-card rounded-2xl overflow-hidden">
                    <button @click="openFaq = (openFaq === 1 ? 0 : 1)" class="w-full p-5 text-left flex items-center justify-between font-bold text-white text-sm cursor-pointer">
                        <span>How are ASFI Sadaqah and Zakat funds verified and audited?</span>
                        <i data-lucide="chevron-down" class="h-4 w-4 text-emerald-400 transition-transform" :class="openFaq === 1 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="openFaq === 1" x-collapse class="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-emerald-900/40 pt-3">
                        ASFI operates under strict Amanah (Trust) principles. 100% of designated Zakat funds are disbursed directly to eligible beneficiaries (Asnaf). We maintain audited accounting records and publish annual transparency reports.
                    </div>
                </div>

                <div class="glass-card rounded-2xl overflow-hidden">
                    <button @click="openFaq = (openFaq === 2 ? 0 : 2)" class="w-full p-5 text-left flex items-center justify-between font-bold text-white text-sm cursor-pointer">
                        <span>Who is eligible for ASFI Education Scholarships?</span>
                        <i data-lucide="chevron-down" class="h-4 w-4 text-emerald-400 transition-transform" :class="openFaq === 2 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="openFaq === 2" x-collapse class="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-emerald-900/40 pt-3">
                        Students enrolled in Kinder to Grade 12 or college programs in Davao City who come from low-income families or orphan backgrounds can apply for education assistance through our portal.
                    </div>
                </div>

                <div class="glass-card rounded-2xl overflow-hidden">
                    <button @click="openFaq = (openFaq === 3 ? 0 : 3)" class="w-full p-5 text-left flex items-center justify-between font-bold text-white text-sm cursor-pointer">
                        <span>How can a family request Emergency Medical Assistance?</span>
                        <i data-lucide="chevron-down" class="h-4 w-4 text-emerald-400 transition-transform" :class="openFaq === 3 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="openFaq === 3" x-collapse class="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-emerald-900/40 pt-3">
                        Families can submit a medical assistance request by filling out our online form or visiting our Davao City office with a valid medical prescription/abstract and proof of identity.
                    </div>
                </div>

                <div class="glass-card rounded-2xl overflow-hidden">
                    <button @click="openFaq = (openFaq === 4 ? 0 : 4)" class="w-full p-5 text-left flex items-center justify-between font-bold text-white text-sm cursor-pointer">
                        <span>What payment methods are supported for donations?</span>
                        <i data-lucide="chevron-down" class="h-4 w-4 text-emerald-400 transition-transform" :class="openFaq === 4 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="openFaq === 4" x-collapse class="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-emerald-900/40 pt-3">
                        We accept GCash online transfer, QR Ph instant scanning, and direct bank transfers (BDO / BPI). All donors receive an official digital receipt.
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- CONTACT & OFFICE LOCATIONS SECTION -->
    <section id="contact" class="py-20 bg-slate-950/80 border-t border-emerald-900/40">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <!-- Contact Info -->
                <div class="lg:col-span-5 space-y-6">
                    <span class="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-300 border border-emerald-500/40">
                        Get In Touch
                    </span>
                    <h2 class="text-3xl font-black text-white">Contact ASFI Foundation</h2>
                    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Have questions about our programs, sponsorships, or volunteering? Reach out to our Davao City team today.
                    </p>

                    <div class="space-y-4 pt-2">
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                <i data-lucide="map-pin" class="h-5 w-5"></i>
                            </div>
                            <div>
                                <h4 class="text-xs font-bold text-white uppercase tracking-wider">Headquarters Location</h4>
                                <p class="text-xs text-slate-300 mt-0.5">AMIS Sadaqah Family Inc., Davao City, 8000 Philippines</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                                <i data-lucide="clock" class="h-5 w-5"></i>
                            </div>
                            <div>
                                <h4 class="text-xs font-bold text-white uppercase tracking-wider">Office Hours</h4>
                                <p class="text-xs text-slate-300 mt-0.5">Saturday to Thursday: 8:00 AM – 4:00 PM</p>
                                <span class="text-[10px] font-bold text-rose-400 uppercase">Friday: Closed</span>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                <i data-lucide="mail" class="h-5 w-5"></i>
                            </div>
                            <div>
                                <h4 class="text-xs font-bold text-white uppercase tracking-wider">Email Address</h4>
                                <p class="text-xs text-emerald-300 font-mono mt-0.5">asfi@amis.edu.ph</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Inquiry Form -->
                <div class="lg:col-span-7">
                    <div class="glass-card rounded-3xl p-6 md:p-8">
                        <h3 class="text-xl font-bold text-white mb-4">Send Us a Message</h3>
                        <form @submit.prevent="submitContactForm()" class="space-y-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">Your Full Name</label>
                                    <input type="text" x-model="contactForm.name" required placeholder="e.g. Ahmad Baulo" class="w-full rounded-xl bg-slate-900 border border-emerald-500/30 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none">
                                </div>
                                <div>
                                    <label class="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">Email Address</label>
                                    <input type="email" x-model="contactForm.email" required placeholder="e.g. ahmad@example.com" class="w-full rounded-xl bg-slate-900 border border-emerald-500/30 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none">
                                </div>
                            </div>
                            <div>
                                <label class="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">Subject / Purpose</label>
                                <select x-model="contactForm.subject" required class="w-full rounded-xl bg-slate-900 border border-emerald-500/30 px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none">
                                    <option value="" disabled>Select Purpose</option>
                                    <option value="Education Assistance Inquiry">Education Assistance Inquiry</option>
                                    <option value="Medical Grant Request">Medical Grant Request</option>
                                    <option value="Sadaqah / Zakat Verification">Sadaqah / Zakat Verification</option>
                                    <option value="Volunteering & Partnership">Volunteering & Partnership</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">Message Details</label>
                                <textarea x-model="contactForm.message" rows="4" required placeholder="Write your message here..." class="w-full rounded-xl bg-slate-900 border border-emerald-500/30 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"></textarea>
                            </div>
                            <button type="submit" class="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition active:scale-95 cursor-pointer">
                                Send Message
                            </button>
                            <p x-show="contactSent" x-cloak class="text-xs text-amber-400 font-bold text-center mt-2">
                                JazakAllahu Khairan! Message sent successfully. Our team will contact you shortly.
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- FOOTER -->
    <footer class="bg-slate-950 border-t border-emerald-950 text-slate-400 text-xs py-12">
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
            
            <div class="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4">
                <p>© 2026 AMIS Sadaqah Family Incorporated (ASFI) - Davao City, Philippines. All Rights Reserved.</p>
                <p class="text-emerald-400 font-semibold">Takaful & Compassion for All</p>
            </div>
        </div>
    </footer>


    <!-- =================================================================== -->
    <!-- MODALS: DONATE MODAL -->
    <!-- =================================================================== -->
    <div x-show="donateModal" x-cloak class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
        <div class="glass-card-light rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative space-y-4 my-auto" @click.outside="donateModal = false">
            <button @click="donateModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                <i data-lucide="x" class="h-5 w-5"></i>
            </button>

            <div class="text-center space-y-1">
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2 font-bold">
                    <i data-lucide="hand-heart" class="h-6 w-6"></i>
                </div>
                <h3 class="text-xl font-black text-slate-900">Make a Donation</h3>
                <p class="text-xs text-slate-500">Support ASFI programs in Davao City through Sadaqah or Zakat.</p>
            </div>

            <!-- Donation Type Selection -->
            <div class="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl font-bold text-xs">
                <button type="button" @click="donationType = 'Sadaqah'" :class="donationType === 'Sadaqah' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'" class="py-2 rounded-lg transition">Sadaqah (Voluntary)</button>
                <button type="button" @click="donationType = 'Zakat'" :class="donationType === 'Zakat' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'" class="py-2 rounded-lg transition">Zakat (Obligatory)</button>
            </div>

            <!-- Payment Instructions -->
            <div class="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <h4 class="font-extrabold text-slate-900 uppercase text-[10px] tracking-wider">Official Transfer Accounts (ASFI Davao)</h4>
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span class="font-bold text-slate-700">GCash Transfer:</span>
                    <span class="font-mono font-black text-emerald-700">09XX-XXX-XXXX</span>
                </div>
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span class="font-bold text-slate-700">Bank Transfer (BDO):</span>
                    <span class="font-mono font-black text-slate-900">0012-3456-7890</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-700">Account Name:</span>
                    <span class="font-bold text-slate-900">AMIS Sadaqah Family Inc.</span>
                </div>
            </div>

            <p class="text-[11px] text-slate-500 text-center">
                JazakAllahu Khairan for your generosity. May Allāh bless and multiply your wealth.
            </p>

            <button @click="donateModal = false" class="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs cursor-pointer">
                Close Dialog
            </button>
        </div>
    </div>


    <!-- =================================================================== -->
    <!-- MODALS: VOLUNTEER MODAL -->
    <!-- =================================================================== -->
    <div x-show="volunteerModal" x-cloak class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
        <div class="glass-card-light rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative space-y-4 my-auto" @click.outside="volunteerModal = false">
            <button @click="volunteerModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                <i data-lucide="x" class="h-5 w-5"></i>
            </button>

            <div class="text-center space-y-1">
                <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 font-bold">
                    <i data-lucide="heart-handshake" class="h-6 w-6"></i>
                </div>
                <h3 class="text-xl font-black text-slate-900">Join ASFI Volunteers</h3>
                <p class="text-xs text-slate-500">Become a volunteer for community outreaches in Davao City.</p>
            </div>

            <form @submit.prevent="submitVolunteer()" class="space-y-3 text-xs">
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
                        <option>Community Food Drives</option>
                        <option>Medical Mission Assistant</option>
                        <option>Scholar Tutoring & Education</option>
                        <option>Disaster Emergency Response</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase shadow-md cursor-pointer">
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
                countdown: {
                    days: '30',
                    hours: '12',
                    minutes: '45',
                    seconds: '00'
                },

                init() {
                    this.startCountdown();
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
                },

                startCountdown() {
                    // Set target launch date (30 days from now)
                    const target = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
                    setInterval(() => {
                        const now = new Date().getTime();
                        const diff = target - now;
                        if (diff > 0) {
                            this.countdown.days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
                            this.countdown.hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                            this.countdown.minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                            this.countdown.seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
                        }
                    }, 1000);
                }
            }
        }
        document.addEventListener('DOMContentLoaded', () => lucide.createIcons());
    </script>
</body>
</html>
