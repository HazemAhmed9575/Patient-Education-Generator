import "../globals.css";

const LOCALES = ["en", "ar"] as const;
type Locale = typeof LOCALES[number];

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const dir = locale === "ar" ? "rtl" : "ltr";

  // ✅ مفيش html/body هنا
  return (
    <div lang={locale} dir={dir} className="min-h-screen bg-white text-zinc-900">
      {children}
    </div>
  );
}