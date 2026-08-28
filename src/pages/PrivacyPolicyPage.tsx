import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  MapPin, 
  Camera, 
  Bell, 
  Trash2, 
  Mail, 
  FileText, 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Printer,
  Calendar,
  Smartphone,
  Server,
  UserCheck
} from 'lucide-react';
import { JeetkLogo } from '../components/JeetkLogo';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyPolicyPage = () => {
  const { language: currentAppLang } = useLanguage();
  const [activeLang, setActiveLang] = useState<'en' | 'ar'>('en');
  const [activeSection, setActiveSection] = useState<string>('intro');

  useEffect(() => {
    // Sync with app language or default to English for international/Play Store reviewers
    if (currentAppLang === 'ar' || currentAppLang === 'en') {
      // Keep English prioritized if user came specifically for review or set to current app language
      setActiveLang(currentAppLang);
    }
  }, [currentAppLang]);

  useEffect(() => {
    // Set page title for SEO & Google Play compliance
    document.title = activeLang === 'ar' 
      ? 'سياسة الخصوصية | تطبيق وموقع جيتك Jeetk' 
      : 'Privacy Policy | Jeetk Delivery App & Website';

    // Scroll to top upon navigation
    window.scrollTo(0, 0);

    // Set meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content', 
        activeLang === 'ar'
          ? 'سياسة الخصوصية الرسمية لخدمة وتطبيق جيتك (Jeetk). توضح كيفية جمع واستخدام وحماية وحذف بيانات المستخدمين وفقاً لمعايير Google Play.'
          : 'Official Privacy Policy for Jeetk Delivery application and platform. Explains data collection, usage, location tracking, data retention, and account deletion rights compliant with Google Play.'
      );
    }
  }, [activeLang]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isRtl = activeLang === 'ar';

  return (
    <div className={`min-h-screen bg-slate-50/50 text-zinc-900 pb-20 ${isRtl ? 'font-arabic dir-rtl' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <section className="bg-white border-b border-zinc-200/80 sticky top-16 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-700">
              <Shield className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900">
                  {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Google Play Compliant
                </span>
              </div>
              <p className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                <span>{isRtl ? 'تطبيق ومنصة جيتك (Jeetk Delivery)' : 'Jeetk Delivery Application & Platform'}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {isRtl ? 'آخر تحديث: 28 أغسطس 2026' : 'Last Updated: August 28, 2026'}
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons: Language toggle + Print */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveLang('en')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeLang === 'en'
                    ? 'bg-white text-violet-700 shadow-sm font-black'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                English
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('ar')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeLang === 'ar'
                    ? 'bg-white text-violet-700 shadow-sm font-black'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                العربية
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors hidden sm:flex items-center gap-1.5 text-xs font-semibold border border-zinc-200 bg-white"
              title={isRtl ? 'طباعة هذه الوثيقة' : 'Print this policy'}
            >
              <Printer className="w-4 h-4" />
              <span>{isRtl ? 'طباعة' : 'Print'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Important Play Store Notice Box */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-50 via-indigo-50 to-white border border-violet-200/80 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-violet-600 text-white shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-sm text-zinc-700 leading-relaxed">
              <h2 className="font-bold text-violet-950 text-base mb-1">
                {isRtl 
                  ? 'مرحبًا بكم في سياسة الخصوصية الرسمية لخدمة جيتك (Jeetk)'
                  : 'Welcome to the Official Jeetk Privacy Policy'}
              </h2>
              <p>
                {isRtl
                  ? 'تلتزم منصة وتطبيق جيتك (Jeetk) بحماية خصوصيتك وضمان أمان بياناتك الشخصية. توضح هذه الوثيقة الشاملة والشفافة ممارساتنا المتعلقة بجمع البيانات، وتتبع الموقع الجغرافي، ومعالجة الطلبات، وحقوق المستخدمين بما في ذلك طلب حذف الحساب والبيانات وفقاً لأحدث سياسات Google Play Console والقوانين المعمول بها.'
                  : 'Jeetk is fully committed to protecting your privacy and ensuring the security of your personal data. This transparent document details our data collection, GPS location tracking, order fulfillment practices, data retention periods, and user data rights including full account deletion in compliance with Google Play Developer Policy.'}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-violet-900">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  {isRtl ? 'وصول مباشر بدون تسجيل دخول' : 'Direct Access (No Login Required)'}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  {isRtl ? 'آلية واضحة لحذف الحساب' : 'Clear Account Deletion Mechanism'}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  {isRtl ? 'إفصاح صريح عن بيانات الموقع' : 'Explicit Location Data Disclosures'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-36 hidden lg:block">
            <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                {isRtl ? 'فهرس المحتويات' : 'Table of Contents'}
              </h3>
              <nav className="space-y-1 text-xs">
                {[
                  { id: 'intro', en: '1. Introduction & Scope', ar: '1. المقدمة ونطاق التطبيق' },
                  { id: 'data-collection', en: '2. Information We Collect', ar: '2. البيانات التي نجمعها' },
                  { id: 'location-data', en: '3. Location Information & Tracking', ar: '3. بيانات وتتبع الموقع الجغرافي' },
                  { id: 'camera-files', en: '4. Camera, Photos & Files', ar: '4. الكاميرا والصور والملفات' },
                  { id: 'notifications', en: '5. Push Notifications & OTP', ar: '5. الإشعارات ورموز التحقق' },
                  { id: 'data-usage', en: '6. How We Use Your Data', ar: '6. كيف نستخدم معلوماتك' },
                  { id: 'data-sharing', en: '7. Sharing & Third Parties', ar: '7. مشاركة البيانات والجهات الخارجية' },
                  { id: 'security-retention', en: '8. Security & Data Retention', ar: '8. أمان البيانات وفترات الاحتفاظ' },
                  { id: 'deletion-rights', en: '9. Account & Data Deletion Rights', ar: '9. حقوق المستخدم وحذف الحساب' },
                  { id: 'children', en: '10. Children\'s Privacy', ar: '10. خصوصية الأطفال' },
                  { id: 'policy-changes', en: '11. Changes to This Policy', ar: '11. التعديلات على هذه السياسة' },
                  { id: 'contact', en: '12. Contact & Privacy Support', ar: '12. معلومات التواصل والدعم' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-start py-2 px-2.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                      activeSection === item.id 
                        ? 'bg-violet-50 text-violet-900 font-bold' 
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                    }`}
                  >
                    <span>{isRtl ? item.ar : item.en}</span>
                    <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-zinc-100">
                <div className="p-3 bg-zinc-50 rounded-xl text-[11px] text-zinc-600 space-y-1.5">
                  <div className="font-bold text-zinc-800 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-violet-600" />
                    <span>{isRtl ? 'مسؤول حماية البيانات:' : 'Privacy Contact:'}</span>
                  </div>
                  <a 
                    href="mailto:support@jeetk.com" 
                    className="text-violet-600 hover:underline font-mono block break-all font-semibold"
                  >
                    support@jeetk.com
                  </a>
                  <a 
                    href="mailto:binsabbah2013@gmail.com" 
                    className="text-zinc-500 hover:underline font-mono block break-all text-[10px]"
                  >
                    binsabbah2013@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Privacy Policy Main Body */}
          <main className="lg:col-span-8 bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-10 shadow-sm space-y-10">
            {/* 1. Introduction */}
            <section id="intro" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <FileText className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '1. المقدمة ونطاق التطبيق' : '1. Introduction & Scope'}
                </h2>
              </div>
              
              {isRtl ? (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    مرحباً بكم في <strong>جيتك (Jeetk)</strong>. نحن منصة وتطبيق رقمي متكامل يربط العملاء بأفضل المطاعم والمتاجر المحلية، ويوفر خدمات توصيل سريعة ودقيقة عبر شبكة من السائقين ومندوبي التوصيل المعتمدين.
                  </p>
                  <p>
                    تنطبق سياسة الخصوصية هذه على جميع خدماتنا، بما يشمل:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ps-2 text-zinc-600">
                    <li>تطبيق <strong>جيتك (Jeetk)</strong> للأجهزة الذكية بنظام أندرويد (المتوفر عبر متجر Google Play) ونظام iOS.</li>
                    <li>الموقع الإلكتروني والمنصة الرقمية على الرابط <code>https://jeetk.com</code> والنطاقات الفرعية المرتبطة بها.</li>
                    <li>واجهات برمجة التطبيقات (APIs) والخدمات السحابية المرافقة.</li>
                  </ul>
                  <p>
                    باستخدامك لتطبيق أو موقع جيتك، فإنك توافق على جمع واستخدام ومعالجة معلوماتك وفقاً لما هو موضح في هذه السياسة. إذا كنت لا توافق على هذه الممارسات، يرجى التوقف عن استخدام خدماتنا.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    Welcome to <strong>Jeetk</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). Jeetk is an on-demand food, beverage, and goods delivery platform connecting customers, partner restaurants/merchants, and dedicated delivery couriers.
                  </p>
                  <p>
                    This Privacy Policy applies to all services offered by Jeetk, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ps-2 text-zinc-600">
                    <li>The <strong>Jeetk Delivery</strong> mobile application distributed via the Google Play Store (Android) and Apple App Store (iOS).</li>
                    <li>The Jeetk website, web portal, and user dashboards at <code>https://jeetk.com</code> and associated domains.</li>
                    <li>Underlying APIs, backend services, and customer support channels.</li>
                  </ul>
                  <p>
                    By downloading, accessing, or using the Jeetk application or website, you acknowledge that you have read and agree to the practices described in this Privacy Policy.
                  </p>
                </div>
              )}
            </section>

            {/* 2. Information We Collect */}
            <section id="data-collection" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <UserCheck className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '2. البيانات التي نجمعها' : '2. Information We Collect'}
                </h2>
              </div>

              {isRtl ? (
                <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    نقوم بجمع فئات البيانات الضرورية فقط لتقديم خدمة التوصيل وتأمين حسابك، وتتضمن:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <h4 className="font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                        <span>أ. بيانات الحساب والملف الشخصي</span>
                      </h4>
                      <p className="text-xs text-zinc-600">
                        الاسم الكامل، عنوان البريد الإلكتروني، رقم الهاتف الأساسي وأرقام الهواتف الإضافية للتواصل، كلمة المرور المشفرة، الدور (عميل، مندوب توصيل، صاحب مطعم، مسؤول)، وتاريخ الميلاد والصورة الشخصية (اختياري).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <h4 className="font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                        <span>ب. بيانات الطلبات والمعاملات</span>
                      </h4>
                      <p className="text-xs text-zinc-600">
                        الوجبات والأصناف المختارة، الكميات، الأسعار، اسم المطعم أو المتجر، العنوان ووصف موقع الاستلام والتسليم، ملاحظات التوصيل الخاصة، وقت التسليم المفضل، حالة الطلب، وتكلفة التوصيل.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <h4 className="font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                        <span>ج. بيانات مندوبي التوصيل والشركاء</span>
                      </h4>
                      <p className="text-xs text-zinc-600">
                        بالنسبة لمندوبي وسائقي التوصيل: معلومات التحقق من الهوية، خطوط السير والمسارات المختارة، وموقع التوصيل المباشر أثناء تنفيذ المهام.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <h4 className="font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                        <span>د. البيانات التقنية ومعلومات الجهاز</span>
                      </h4>
                      <p className="text-xs text-zinc-600">
                        نوع الجهاز وطرازه، نظام التشغيل وإصداره، عنوان بروتوكول الإنترنت (IP)، معرفات الجهاز الفريدة، وتقارير الأخطاء لغرض تصحيح الأعطال وضمان استقرار التطبيق.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    We collect only the categories of data strictly necessary to fulfill delivery orders, authenticate users, and ensure platform security:
                  </p>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <h4 className="font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                        <span>A. Account & Profile Information</span>
                      </h4>
                      <p className="text-xs text-zinc-600">
                        Full name, email address, primary and secondary phone numbers with country codes, securely hashed password credentials, assigned account role (Customer, Delivery Courier, Restaurant Partner, Admin), optional profile avatar, and optional date of birth.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <h4 className="font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                        <span>B. Order & Transaction Data</span>
                      </h4>
                      <p className="text-xs text-zinc-600">
                        Ordered meal items, item prices, quantities, vendor sources, order notes, delivery location descriptions, reception instructions, order status progression, timestamps, delivery price, and invoice attachments.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <h4 className="font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                        <span>C. Delivery Driver & Partner Information</span>
                      </h4>
                      <p className="text-xs text-zinc-600">
                        For registered couriers: verification credentials, assigned delivery route regions, active delivery status, and live routing updates during active order delivery.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <h4 className="font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                        <span>D. Technical & Device Information</span>
                      </h4>
                      <p className="text-xs text-zinc-600">
                        Device model, operating system version, browser type, IP address, unique device identifiers, network state, and crash diagnostics to maintain system uptime and application stability.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 3. Location Information & Tracking */}
            <section id="location-data" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <MapPin className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '3. بيانات وتتبع الموقع الجغرافي (Location Disclosure)' : '3. Location Information & Tracking (Play Store Disclosure)'}
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{isRtl ? 'إفصاح صريح عن استخدام إذن الموقع الجغرافي (Prominent Disclosure)' : 'Prominent Disclosure on Location Data Usage'}</span>
                </div>
                <p>
                  {isRtl
                    ? 'يطلب تطبيق جيتك الوصول إلى بيانات موقعك الجغرافي (الدقيق والتقريبي) فقط عند الحاجة لتحديد عنوان التوصيل، وحساب أسعار ومسافات التوصيل بدقة، وتمكين ميزة التتبع المباشر للطلبات النشطة.'
                    : 'The Jeetk app requests access to your precise and/or approximate geographic location data solely to determine delivery addresses, compute exact delivery fees and routes, and enable real-time order tracking.'}
                </p>
              </div>

              {isRtl ? (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <h4 className="font-bold text-zinc-900">تفاصيل استخدام الموقع:</h4>
                  <ul className="list-disc list-inside space-y-2 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li>
                      <strong>للعملاء (أثناء استخدام التطبيق):</strong> يتم جمع بيانات الموقع الجغرافي فقط أثناء استخدامك للتطبيق (Foreground) لتسهيل اختيار موقع التسليم الحالي دون الحاجة لكتابة العنوان يدوياً.
                    </li>
                    <li>
                      <strong>لمندوبي وسائقي التوصيل:</strong> قد يقوم التطبيق بجمع بيانات الموقع الجغرافي أثناء تشغيل مسار توصيل نشط لتحديث حالة الطلب ومشاركة الموقع التقديري لوصول الوجبة مع العميل.
                    </li>
                    <li>
                      <strong>التحكم في الأذونات:</strong> يمكنك في أي وقت إيقاف أو تعديل إذن الوصول إلى الموقع عبر إعدادات جهازك الذكي (Settings &gt; Apps &gt; Jeetk &gt; Permissions)، مع العلم أنه يمكنك دوماً إدخال عنوان التوصيل يدوياً.
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <h4 className="font-bold text-zinc-900">How We Process Location:</h4>
                  <ul className="list-disc list-inside space-y-2 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li>
                      <strong>For Customers (Foreground Only):</strong> Location is only accessed while the application is in active use in the foreground to pinpoint your delivery address and show nearby available restaurants and hubs.
                    </li>
                    <li>
                      <strong>For Delivery Couriers:</strong> When a courier is actively fulfilling an assigned delivery route, location data may be transmitted to calculate ETA and inform the customer of incoming delivery progress.
                    </li>
                    <li>
                      <strong>User Control:</strong> You can grant or revoke location permissions at any time through your device settings (Android Settings &gt; Apps &gt; Jeetk &gt; Permissions). You may always enter manual textual addresses if you prefer not to share GPS coordinates.
                    </li>
                  </ul>
                </div>
              )}
            </section>

            {/* 4. Camera, Photos & Files */}
            <section id="camera-files" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Camera className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '4. الكاميرا والصور والملفات (Camera & Attachments)' : '4. Camera, Photos & File Attachments'}
                </h2>
              </div>

              {isRtl ? (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    قد يطلب التطبيق إذن الوصول إلى الكاميرا أو معرض الصور في الحالات التالية فقط:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li><strong>فواتير وإيصالات الطلبات:</strong> إرفاق صور الفواتير أو إيصالات الدفع والتسليم للتوثيق المحاسبي.</li>
                    <li><strong>الصور الشخصية للملف:</strong> رفع صورة الملف الشخصي للمستخدم أو مندوب التوصيل (اختياري).</li>
                    <li><strong>صور الوجبات والمطاعم:</strong> لأصحاب المطاعم لإضافة وتعديل صور قوائم الطعام والوجبات.</li>
                  </ul>
                  <p className="text-xs text-zinc-500">
                    لا يقوم تطبيق جيتك بالوصول إلى أي صور أو ملفات أخرى في جهازك بخلاف ما تقوم باختياره وإرفاقه صراحةً.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    The Jeetk application may request access to your device camera or photo library strictly for:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li><strong>Order Invoices & Receipts:</strong> Uploading photo proof of invoices, receipts, or delivery confirmation.</li>
                    <li><strong>Profile Photos:</strong> Uploading an optional user avatar or delivery courier profile photo.</li>
                    <li><strong>Menu & Meal Items:</strong> For restaurant owners to upload photos of dishes and menu listings.</li>
                  </ul>
                  <p className="text-xs text-zinc-500">
                    Jeetk never scans, uploads, or accesses unselected media or external files on your device.
                  </p>
                </div>
              )}
            </section>

            {/* 5. Push Notifications & OTP */}
            <section id="notifications" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Bell className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '5. الإشعارات ورموز التحقق (OTP & Notifications)' : '5. Push Notifications & OTP Verification'}
                </h2>
              </div>

              {isRtl ? (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    نستخدم قنوات الإشعار والتواصل للأغراض التشغيلية والأمنية التالية:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li><strong>رموز التحقق لمرة واحدة (OTP):</strong> إرسال رموز التحقق عبر الرسائل النصية القصيرة (SMS)، أو تطبيق WhatsApp، أو البريد الإلكتروني لتأكيد تسجيل الدخول أو إعادة تعيين كلمة المرور.</li>
                    <li><strong>تحديثات الطلبات:</strong> إرسال إشعارات فورية حول مراحل تجهيز الطلب وخروجه للتوصيل ووصوله.</li>
                    <li><strong>تنبيهات الأمان:</strong> إخطارك بأي نشاط أمني مهم في حسابك.</li>
                  </ul>
                  <p className="text-xs text-zinc-500">
                    يمكنك إيقاف إشعارات الدفع في أي وقت من خلال إعدادات جهازك.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    We process notification tokens and communications for essential transactional operations:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li><strong>One-Time Passwords (OTP):</strong> Dispatching security codes via SMS, WhatsApp, or Email to verify phone numbers, login sessions, or password reset requests.</li>
                    <li><strong>Order Status Alerts:</strong> Delivering push alerts regarding order confirmation, kitchen preparation, driver dispatch, and arrival.</li>
                    <li><strong>Account Security:</strong> Immediate alerts regarding security events or critical account updates.</li>
                  </ul>
                  <p className="text-xs text-zinc-500">
                    You can manage or disable push notifications at any time in your device notification preferences.
                  </p>
                </div>
              )}
            </section>

            {/* 6. How We Use Your Data */}
            <section id="data-usage" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Server className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '6. كيف نستخدم معلوماتك' : '6. How We Use Your Data'}
                </h2>
              </div>

              {isRtl ? (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>تُستخدم بياناتك للأغراض المشروعة والتشغيلية المحددة أدناه:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1">
                      <span className="font-bold text-zinc-900 block">1. تنفيذ الطلبات والتوصيل</span>
                      <span className="text-zinc-600">معالجة طلبك، وتوجيهه للمطعم المعني، وتعيين السائق الأنسب لإيصال الطلب.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1">
                      <span className="font-bold text-zinc-900 block">2. إدارة الحسابات والتحقق</span>
                      <span className="text-zinc-600">التحقق من هوية المستخدمين والمندوبين ومنع إنشاء حسابات وهمية أو مكررة.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1">
                      <span className="font-bold text-zinc-900 block">3. الدعم الفني وخدمة العملاء</span>
                      <span className="text-zinc-600">الرد على الاستفسارات وحل أي شكاوى أو مشكلات تواجهك أثناء الطلب.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1">
                      <span className="font-bold text-zinc-900 block">4. الأمان ومكافحة الاحتيال</span>
                      <span className="text-zinc-600">حماية منصتنا ومستخدمينا من أي محاولات احتيال أو استخدام غير مصرح به.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>We process your data strictly for legitimate business and operational purposes:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1">
                      <span className="font-bold text-zinc-900 block">1. Order Fulfillment & Delivery</span>
                      <span className="text-zinc-600">Processing food orders, forwarding items to merchants, and dispatching couriers to your location.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1">
                      <span className="font-bold text-zinc-900 block">2. Account Management & Auth</span>
                      <span className="text-zinc-600">Authenticating users, maintaining role-based access, and securing account credentials.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1">
                      <span className="font-bold text-zinc-900 block">3. Customer Support & Resolution</span>
                      <span className="text-zinc-600">Responding to customer inquiries, tracking missing items, and resolving delivery issues.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1">
                      <span className="font-bold text-zinc-900 block">4. Security & Fraud Prevention</span>
                      <span className="text-zinc-600">Preventing suspicious activities, unauthorized access, and abusive platform behaviors.</span>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 7. Sharing & Third Parties */}
            <section id="data-sharing" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Globe className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '7. مشاركة البيانات والجهات الخارجية' : '7. Data Sharing & Third-Party Services'}
                </h2>
              </div>

              {isRtl ? (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 font-semibold text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>نحن لا نبيع بياناتك الشخصية لأي جهات تسويقية أو وسطاء بيانات على الإطلاق.</span>
                  </div>
                  <p>تتم مشاركة البيانات فقط في الحدود الدنيا اللازمة للتشغيل مع الأطراف التالية:</p>
                  <ul className="list-disc list-inside space-y-1.5 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li><strong>المطاعم والمتاجر الشريكة:</strong> تزويدهم بأسماء الأصناف المطلوبة والاسم الأول للعميل لتجهيز الوجبات.</li>
                    <li><strong>سائقو ومندوبو التوصيل:</strong> تزويدهم برقم هاتف العميل، وعنوان وملاحظات التوصيل، لتسليم الطلب بنجاح.</li>
                    <li><strong>مزودو البنية التحتية والخدمات السحابية:</strong> خوادم الاستضافة الآمنة وقواعد البيانات (<code>jeetk-api.runasp.net</code>)، وخدمات خرائط Google Maps لعرض المواقع بدقة.</li>
                    <li><strong>الامتثال القانوني:</strong> الإفصاح عن البيانات في الحالات التي يفرضها القانون أو أوامر الجهات القضائية المختصة.</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 font-semibold text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Jeetk NEVER sells, rents, or trades your personal information to third-party data brokers or advertisers.</span>
                  </div>
                  <p>Information is shared only to the minimum extent necessary to provide the service:</p>
                  <ul className="list-disc list-inside space-y-1.5 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li><strong>Partner Restaurants & Merchants:</strong> Order item details and customer first name to prepare requested meals.</li>
                    <li><strong>Assigned Delivery Couriers:</strong> Delivery destination address, customer phone number, and special delivery notes to ensure accurate delivery.</li>
                    <li><strong>Technical Infrastructure Providers:</strong> Secure cloud API hosting infrastructure (<code>jeetk-api.runasp.net</code>) and Google Maps Platform for mapping and distance calculation.</li>
                    <li><strong>Legal & Regulatory Authorities:</strong> Disclosed only when legally required by subpoena, court order, or binding regulation.</li>
                  </ul>
                </div>
              )}
            </section>

            {/* 8. Security & Data Retention */}
            <section id="security-retention" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Lock className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '8. أمان البيانات وفترات الاحتفاظ بها' : '8. Data Security & Retention'}
                </h2>
              </div>

              {isRtl ? (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    نطبق تدابير أمنية وتقنية صارمة لحماية بياناتك:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li><strong>التشفير الكامل:</strong> استخدام بروتوكول HTTPS / TLS 1.2+ لجميع الاتصالات بين التطبيق والخوادم.</li>
                    <li><strong>رموز المصادقة المشفرة:</strong> إدارة جلسات تسجيل الدخول عبر رموز JWT المشفرة ذات الصلاحية المحددة.</li>
                    <li><strong>تشفير كلمات المرور:</strong> تخزين كلمات المرور بصيغة مجزأة (Hashed) يستحيل فكها.</li>
                  </ul>
                  <h4 className="font-bold text-zinc-900 pt-2">فترات الاحتفاظ بالبيانات:</h4>
                  <p className="text-xs sm:text-sm text-zinc-600">
                    نحتفظ ببيانات الحساب طوال فترة نشاط حسابك. تُحفظ سجلات الطلبات والمعاملات المالية للمدة الضرورية قانونياً ومحاسبياً، وتُحذف أو تُجرد من الهوية عند طلب حذف الحساب.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    We employ robust technical and organizational security controls to protect your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ps-2 text-zinc-600 text-xs sm:text-sm">
                    <li><strong>End-to-End Transport Security:</strong> Strict HTTPS / TLS 1.2+ encryption across all client-server communication channels.</li>
                    <li><strong>Token-Based Authentication:</strong> Secure JSON Web Tokens (JWT) for session management with automated expiration.</li>
                    <li><strong>Password Hashing:</strong> Passwords are cryptographically salted and hashed prior to database storage.</li>
                  </ul>
                  <h4 className="font-bold text-zinc-900 pt-2">Data Retention Policy:</h4>
                  <p className="text-xs sm:text-sm text-zinc-600">
                    We retain your personal data for as long as your account remains active. Transaction and invoice records are kept for the duration required by statutory financial, tax, and accounting regulations, after which they are permanently purged or anonymized.
                  </p>
                </div>
              )}
            </section>

            {/* 9. Account & Data Deletion Rights (Google Play Requirement) */}
            <section id="deletion-rights" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Trash2 className="w-5 h-5 text-red-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '9. حقوق المستخدم وحذف الحساب والبيانات (Account & Data Deletion)' : '9. Account & Data Deletion Rights (Play Console Compliant)'}
                </h2>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-red-50/60 border border-red-200 text-zinc-800 text-xs sm:text-sm leading-relaxed space-y-3">
                <div className="flex items-center gap-2 font-bold text-red-950">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{isRtl ? 'حقك الكامل في حذف حسابك وبياناتك الشخصية' : 'Your Right to Delete Your Account and Personal Data'}</span>
                </div>
                <p>
                  {isRtl
                    ? 'امتثالاً لمتطلبات Google Play Developer Data Safety Policy، يحق لأي مستخدم لتطبيق جيتك طلب حذف حسابه نهائياً وكافة البيانات المرتبطة به في أي وقت وبكل سهولة.'
                    : 'In full compliance with Google Play’s Account Deletion Policy, any Jeetk user can request the permanent deletion of their account and all associated personal data at any time.'}
                </p>
                
                <div className="pt-2 border-t border-red-200/60">
                  <h4 className="font-bold text-red-950 mb-2">
                    {isRtl ? 'كيفية تقديم طلب حذف الحساب:' : 'How to Request Account & Data Deletion:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-red-100 shadow-xs space-y-1">
                      <span className="font-bold text-zinc-900 block text-xs">
                        {isRtl ? 'الخيار 1: من داخل التطبيق' : 'Option 1: In-App Deletion'}
                      </span>
                      <span className="text-[11px] text-zinc-600 block">
                        {isRtl 
                          ? 'توجه إلى لوحة التحكم &gt; الملف الشخصي &gt; إعدادات الحساب &gt; الضغط على "حذف الحساب نهائياً".' 
                          : 'Navigate to Dashboard &gt; Profile &gt; Account Settings &gt; Click "Delete Account".'}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-red-100 shadow-xs space-y-1">
                      <span className="font-bold text-zinc-900 block text-xs">
                        {isRtl ? 'الخيار 2: عبر البريد الإلكتروني المباشر' : 'Option 2: Direct Email Request'}
                      </span>
                      <span className="text-[11px] text-zinc-600 block">
                        {isRtl 
                          ? 'أرسل طلباً إلى: support@jeetk.com مع ذكر بريدك الإلكتروني أو رقم هاتفك المسجل وسيتم مسح بياناتك خلال 30 يوماً.' 
                          : 'Send an email to support@jeetk.com with your registered phone/email. Deletion is executed within 30 business days.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 10. Children's Privacy */}
            <section id="children" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Shield className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '10. خصوصية الأطفال' : '10. Children\'s Privacy'}
                </h2>
              </div>

              {isRtl ? (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    خدمات وتطبيق جيتك غير موجهة للأطفال دون سن 13 عاماً (أو السن القانونية المحددة في بلدك). نحن لا نقوم بجمع أي بيانات شخصية من الأطفال عن علم. إذا تبيّن لنا أن طفلاً قد زوّدنا بمعلومات شخصية دون موافقة ولي الأمر، فإننا نحذف هذه المعلومات على الفور.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    Jeetk is not intended for use by children under 13 years of age (or the applicable age in your jurisdiction). We do not knowingly collect or solicit personal information from children. If we learn that we have collected personal data from a child without verified parental consent, we will promptly delete that information from our records.
                  </p>
                </div>
              )}
            </section>

            {/* 11. Changes to This Policy */}
            <section id="policy-changes" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Calendar className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '11. التعديلات على سياسة الخصوصية' : '11. Changes to This Privacy Policy'}
                </h2>
              </div>

              {isRtl ? (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    قد نقوم بتحديث سياسة الخصوصية هذه من حين لآخر لمواكبة التحديثات في خدماتنا أو التغييرات في المتطلبات التنظيمية والقانونية. سنقوم بنشر أي تعديلات مباشرة على هذه الصفحة وتحديث تاريخ &quot;آخر تحديث&quot; في أعلى الوثيقة.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <p>
                    We may update this Privacy Policy from time to time to reflect modifications in our services, technological advancements, or statutory updates. Any changes will be posted directly to this URL with an updated &quot;Last Updated&quot; date at the top of the policy.
                  </p>
                </div>
              )}
            </section>

            {/* 12. Contact Information */}
            <section id="contact" className="scroll-mt-36 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Mail className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                  {isRtl ? '12. معلومات التواصل والدعم' : '12. Contact Information & Support'}
                </h2>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-4 text-xs sm:text-sm text-zinc-700">
                <p>
                  {isRtl
                    ? 'إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، أو كنت ترغب في ممارسة حقوقك في الوصول إلى بياناتك أو تصحيحها أو حذفها، يُرجى التواصل مع فريق الخصوصية لدينا عبر الوسائل التالية:'
                    : 'If you have questions, inquiries, or requests regarding this Privacy Policy or wish to exercise your rights to access, update, or delete your personal data, please contact our dedicated Privacy & Security team at:'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-white rounded-xl border border-zinc-200/60 shadow-xs space-y-1">
                    <span className="font-bold text-zinc-900 block text-xs">
                      {isRtl ? 'البريد الإلكتروني الرسمي:' : 'Official Privacy Email:'}
                    </span>
                    <a 
                      href="mailto:support@jeetk.com" 
                      className="text-violet-600 hover:underline font-mono font-bold block break-all text-xs"
                    >
                      support@jeetk.com
                    </a>
                    <a 
                      href="mailto:binsabbah2013@gmail.com" 
                      className="text-zinc-500 hover:underline font-mono block break-all text-[11px]"
                    >
                      binsabbah2013@gmail.com
                    </a>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-zinc-200/60 shadow-xs space-y-1">
                    <span className="font-bold text-zinc-900 block text-xs">
                      {isRtl ? 'المنصة والتطبيق:' : 'Platform & Application:'}
                    </span>
                    <span className="text-zinc-800 font-semibold block text-xs">
                      Jeetk Delivery Services (منصة جيتك لتوصيل الطلبات)
                    </span>
                    <span className="text-zinc-500 block text-[11px]">
                      URL: https://jeetk.com/privacy-policy
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
