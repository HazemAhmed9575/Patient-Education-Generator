import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import GeneratorClient from "@/components/GeneratorClient";
import LanguageSwitch from "@/components/LanguageSwitch";

export default async function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = await getDict(locale);
  return (
    <main className="container mx-auto py-8">
    <div className="flex justify-end mb-4">
        <LanguageSwitch locale={locale} />
      </div>
      <GeneratorClient dict={dict} locale={locale} />
    </main>
  );
}

