"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import { personalData } from "@/utils/data/personal-data";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import { useLanguage } from "../../i18n/language-provider";

const RESTORE_SECONDS = 5;

function ContactForm() {
  const { t } = useLanguage();
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  // The CV stays behind the form until a message actually goes through.
  const [isSent, setIsSent] = useState(false);
  // Seconds left before the form slides back in; null means no countdown running.
  const [restoreIn, setRestoreIn] = useState(null);
  // Bumped on every restore so the form replays its entrance animation.
  const [restoreCount, setRestoreCount] = useState(0);

  useEffect(() => {
    if (restoreIn === null) return;

    if (restoreIn === 0) {
      setIsSent(false);
      setRestoreIn(null);
      setRestoreCount((count) => count + 1);
      return;
    }

    const timer = setTimeout(() => setRestoreIn((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [restoreIn]);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();


    if (!userInput?.email || !userInput?.message || !userInput?.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      console.log("Error: Invalid email");
      return;
    } else {
      console.log("All fields are valid");
      setError({ ...error, required: false });
    };

    try {
      setIsLoading(true);
      console.log("Sending message...",  `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput
      );

      console.log("Response:", res);

      toast.success(t.contact.success);
      setIsSent(true);
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || t.contact.error);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">{t.contact.title}</p>
      {/* The card frame dissolves with the form so the panel stands alone. */}
      <div
        className={`max-w-3xl text-white rounded-lg border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isSent ? "border-transparent p-0" : "border-[#464c6a] p-3 lg:p-5"
        }`}
      >
        {/* Form collapses away once a message goes through; the grid-rows
            0fr/1fr pair lets the card morph height smoothly instead of jumping. */}
        <div
          aria-hidden={isSent}
          className={`grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isSent ? "grid-rows-[0fr] opacity-0 pointer-events-none" : "grid-rows-[1fr] opacity-100"
          }`}
        >
          <div className="overflow-hidden">
          <div key={restoreCount} className={restoreCount > 0 ? "resume-form-return" : undefined}>
        <p className="text-sm text-[#d3d8e8]">{t.contact.intro}</p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">{t.contact.name}</label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">{t.contact.email}</label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required={true}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && <p className="text-sm text-red-400">{t.contact.invalidEmail}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">{t.contact.message}</label>
            <textarea
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            {error.required && <p className="text-sm text-red-400">
              {t.contact.requiredFields}
            </p>}
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              onClick={handleSendMail}
              disabled={isLoading}
            >
              {
                isLoading ?
                <span>{t.contact.sending}</span>:
                <span className="flex items-center gap-1">
                  {t.contact.send}
                  <TbMailForward size={20} />
                </span>
              }
            </button>

            <p className="max-w-md text-center text-xs leading-relaxed text-[#d3d8e8]">
              {t.contact.resumeHint}
            </p>
          </div>
        </div>
          </div>
          </div>
        </div>

        <div
          className={`grid transition-all duration-700 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isSent ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            {isSent && (
              <div className="resume-panel p-5 lg:p-7">
                <div className="relative z-10 flex flex-col items-center gap-5">
                  <div className="w-full space-y-1.5 font-mono text-[11px] sm:text-xs">
                    <p className="flex flex-wrap items-center gap-x-2">
                      <span className="text-pink-500">$</span>
                      <span className="text-white">{t.contact.console.sendLabel}</span>
                      <span className="text-gray-400">--&gt;</span>
                      <span className="text-[#16f2b3]">{t.contact.console.sendResult}</span>
                    </p>
                    <p className="flex flex-wrap items-center gap-x-2">
                      <span className="text-pink-500">$</span>
                      <span className="text-white">{t.contact.console.unlockLabel}</span>
                      <span className="text-gray-400">--&gt;</span>
                      <span className="tracking-widest text-[#16f2b3]">
                        {t.contact.console.unlockResult}
                      </span>
                      <span className="resume-cursor text-[#16f2b3]">_</span>
                    </p>
                  </div>

                  <p className="text-center text-sm text-[#d3d8e8]">
                    {t.contact.resumeUnlocked}
                  </p>

                  <a
                    href={personalData.resumeFile}
                    download
                    onClick={() => setRestoreIn((current) => (current === null ? RESTORE_SECONDS : current))}
                    className="resume-btn"
                  >
                    <span className="resume-btn__inner px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white md:px-10 md:text-sm">
                      <MdDownload size={18} />
                      {t.contact.downloadResume}
                    </span>
                  </a>

                  <p className="font-mono text-[10px] text-gray-400">
                    Israel_Rojas_Desarrollador_Web.pdf &middot; 67 KB
                  </p>

                  {restoreIn !== null && (
                    <div className="w-full max-w-xs" aria-live="polite">
                      <p className="mb-2 text-center text-xs text-[#d3d8e8]">
                        {t.contact.restoreNote}
                      </p>
                      <p className="flex items-center justify-center gap-2 font-mono text-[11px]">
                        <span className="text-pink-500">$</span>
                        <span className="text-white">{t.contact.console.restoreLabel}</span>
                        <span className="text-gray-400">--&gt;</span>
                        <span className="text-[#16f2b3]">{restoreIn}s</span>
                      </p>
                      <div className="mt-2 h-[2px] w-full overflow-hidden bg-[#1b2c68a0]">
                        <div
                          className="resume-drain h-full w-full bg-gradient-to-r from-[#16f2b3] via-violet-600 to-pink-500"
                          style={{ animationDuration: `${RESTORE_SECONDS}s` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
