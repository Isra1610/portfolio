import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import LanguageProvider from "./components/i18n/language-provider";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import { getDictionary } from "@/utils/i18n/dictionaries";
import { getRequestLocale } from "@/utils/i18n/server";
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const t = getDictionary(await getRequestLocale());

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  };
};

export default async function RootLayout({ children }) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale}>
      <body className={inter.className} cz-shortcut-listen="true">
        <LanguageProvider initialLocale={locale}>
          <ToastContainer />
          <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
            <Navbar />
            {children}
            <ScrollToTop />
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
