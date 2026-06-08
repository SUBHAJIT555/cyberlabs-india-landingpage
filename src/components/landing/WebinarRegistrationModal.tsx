"use client";

import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import GradientText from "@/components/ui/GradientText";
import {
  backgroundOptions,
  type WebinarSession,
} from "@/data/webinar-schedule";
import {
  formatWebinarDate,
  formatWebinarOptionLabel,
  formatWebinarShortDate,
  formatWebinarTime,
  getUpcomingWebinars,
} from "@/lib/webinar-schedule-utils";
import "react-datepicker/dist/react-datepicker.css";

type WebinarRegistrationModalProps = {
  isOpen: boolean;
  webinar: WebinarSession | null;
  onClose: () => void;
};

type FormState = {
  firstName: string;
  middleName: string;
  lastName: string;
  pronoun: "" | "he" | "she";
  email: string;
  mobile: string;
  background: string;
  backgroundOther: string;
  yearsOfExperience: string;
  preferredCallDateTime: Date | null;
  specificQuestion: string;
  selectedWebinarId: string;
};

const initialFormState: FormState = {
  firstName: "",
  middleName: "",
  lastName: "",
  pronoun: "",
  email: "",
  mobile: "",
  background: "",
  backgroundOther: "",
  yearsOfExperience: "",
  preferredCallDateTime: null,
  specificQuestion: "",
  selectedWebinarId: "",
};

const inputClassName =
  "w-full rounded-sm border border-dashed border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200/80";

const labelClassName =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500";

const backdropTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

const panelSpring = {
  type: "spring" as const,
  damping: 34,
  stiffness: 280,
  mass: 0.9,
};

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function ModalPatternBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%)",
        backgroundSize: "5px 5px",
        opacity: 0.55,
      }}
    />
  );
}

function FormSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border border-dotted border-zinc-300 bg-neutral-100 p-4 sm:p-5 rounded-xl ",
        className,
      )}
    >
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function RequiredMark() {
  return <span className="text-blue-500">*</span>;
}

function GenderMaleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 14a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
      <path d="M19 5l-5.4 5.4" />
      <path d="M19 5h-5" />
      <path d="M19 5v5" />
    </svg>
  );
}

function GenderFemaleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 9a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
      <path d="M12 14v7" />
      <path d="M9 18h6" />
    </svg>
  );
}

export function WebinarRegistrationModal({
  isOpen,
  webinar,
  onClose,
}: WebinarRegistrationModalProps) {
  const isMobile = useIsMobile();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [webinarError, setWebinarError] = useState(false);

  const upcomingWebinars = useMemo(() => getUpcomingWebinars(), []);

  const activeWebinar = useMemo(
    () =>
      upcomingWebinars.find((session) => session.id === form.selectedWebinarId) ??
      null,
    [form.selectedWebinarId, upcomingWebinars],
  );

  const shortDate = activeWebinar
    ? formatWebinarShortDate(activeWebinar.scheduledAt)
    : null;

  useEffect(() => {
    if (!isOpen) {
      setForm(initialFormState);
      setSubmitted(false);
      setDateError(false);
      setWebinarError(false);
      return;
    }

    setForm({
      ...initialFormState,
      selectedWebinarId: webinar?.id ?? "",
    });
  }, [isOpen, webinar?.id]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const showOtherBackground = form.background === "Other";

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.selectedWebinarId || !activeWebinar) {
      setWebinarError(true);
      return;
    }

    if (!form.preferredCallDateTime) {
      setDateError(true);
      return;
    }

    setWebinarError(false);
    setDateError(false);

    const payload = {
      webinar: activeWebinar,
      ...form,
      background:
        form.background === "Other" ? form.backgroundOther : form.background,
    };

    console.log("Webinar registration submitted:", payload);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-100 flex items-stretch justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
          role="dialog"
          aria-modal="true"
          aria-labelledby="webinar-registration-title"
        >
          <motion.button
            type="button"
            aria-label="Close registration form"
            className="absolute inset-0 bg-zinc-900/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={onClose}
          />

          <motion.div
            initial={
              isMobile
                ? { y: "100%" }
                : { opacity: 0, y: 28, scale: 0.96 }
            }
            animate={
              isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              isMobile
                ? { y: "100%" }
                : { opacity: 0, y: 20, scale: 0.98 }
            }
            transition={panelSpring}
            className="relative z-10 flex h-dvh w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-neutral-50 sm:h-auto sm:max-h-[min(88dvh,860px)] sm:max-w-2xl sm:rounded-3xl sm:border sm:border-dashed sm:border-neutral-200 sm:shadow-2xl sm:shadow-zinc-900/10"
          >
            <ModalPatternBackground />

            <div className="relative z-10 shrink-0 border-b border-dashed border-zinc-200 px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-dotted border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <GradientText
                      className="text-xs font-semibold uppercase tracking-[0.14em]"
                      colors={[
                        "#52525b",
                        "#2563eb",
                        "#3f3f46",
                        "#1d4ed8",
                        "#52525b",
                      ]}
                      animationSpeed={4}
                      direction="horizontal"
                      showBorder={false}
                      pauseOnHover={false}
                    >
                      Webinar Registration
                    </GradientText>
                  </span>

                  <h2
                    id="webinar-registration-title"
                    className="mt-4 text-pretty text-xl font-semibold leading-snug text-zinc-900 sm:text-2xl"
                  >
                    {activeWebinar?.topic ?? "Register for a CYBERLABS Webinar"}
                  </h2>

                  {activeWebinar ? (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">
                      {shortDate ? (
                        <div className="inline-flex items-center rounded-sm border border-dashed border-zinc-200 bg-white px-2 py-1 text-xs shadow-sm sm:rounded-sm sm:px-3 sm:py-2 sm:text-sm">
                          <span className="font-medium text-zinc-800">
                            Date: {formatWebinarDate(activeWebinar.scheduledAt)}
                          </span>
                        </div>
                      ) : null}
                      <span className="inline-flex rounded-sm border border-dashed border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-700 shadow-sm sm:rounded-sm sm:px-3 sm:py-2 sm:text-sm">
                        Time: {formatWebinarTime(activeWebinar.scheduledAt)}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                      Complete the form below and our team will confirm your
                      session.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-800"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div
              data-lenis-prevent
              className="webinar-modal-scroll relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5"
            >
              {submitted ? (
                <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/80 px-5 py-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-emerald-300 bg-white text-lg text-emerald-600">
                    ✓
                  </div>
                  <p className="mt-4 text-lg font-semibold text-emerald-900">
                    Registration received
                  </p>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-emerald-800">
                    Thank you for registering. We will contact you shortly with
                    webinar details.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 rounded-xl border border-zinc-900 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  id="webinar-registration-form"
                  onSubmit={handleSubmit}
                  className="space-y-4 pb-2"
                >
                  {!webinar ? (
                    <FormSection title="Webinar Selection">
                      <div>
                        <label
                          htmlFor="selectedWebinar"
                          className={labelClassName}
                        >
                          Select webinar <RequiredMark />
                        </label>
                        {upcomingWebinars.length > 0 ? (
                          <>
                            <select
                              id="selectedWebinar"
                              required
                              value={form.selectedWebinarId}
                              onChange={(e) => {
                                updateField("selectedWebinarId", e.target.value);
                                if (e.target.value) setWebinarError(false);
                              }}
                              className={cn(
                                inputClassName,
                                "appearance-none",
                                webinarError && "border-red-300 bg-red-50/40",
                              )}
                            >
                              <option value="" disabled>
                                Select an upcoming webinar
                              </option>
                              {upcomingWebinars.map((session) => (
                                <option key={session.id} value={session.id}>
                                  {formatWebinarOptionLabel(session)}
                                </option>
                              ))}
                            </select>
                            {webinarError ? (
                              <p className="mt-1.5 text-xs font-medium text-red-600">
                                Please select a webinar to register.
                              </p>
                            ) : null}
                          </>
                        ) : (
                          <p className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-600">
                            No upcoming webinars are open for registration right
                            now. Please check back soon.
                          </p>
                        )}
                      </div>
                    </FormSection>
                  ) : null}

                  <FormSection title="Personal Details">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label htmlFor="firstName" className={labelClassName}>
                          First name <RequiredMark />
                        </label>
                        <input
                          id="firstName"
                          required
                          value={form.firstName}
                          onChange={(e) =>
                            updateField("firstName", e.target.value)
                          }
                          className={inputClassName}
                          autoComplete="given-name"
                        />
                      </div>
                      <div>
                        <label htmlFor="middleName" className={labelClassName}>
                          Middle name
                        </label>
                        <input
                          id="middleName"
                          value={form.middleName}
                          onChange={(e) =>
                            updateField("middleName", e.target.value)
                          }
                          className={inputClassName}
                          autoComplete="additional-name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClassName}>
                          Last name <RequiredMark />
                        </label>
                        <input
                          id="lastName"
                          required
                          value={form.lastName}
                          onChange={(e) =>
                            updateField("lastName", e.target.value)
                          }
                          className={inputClassName}
                          autoComplete="family-name"
                        />
                      </div>
                    </div>

                    <div>
                      <span className={labelClassName}>
                        He / She <RequiredMark />
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {(["he", "she"] as const).map((value) => (
                          <label
                            key={value}
                            className={cn(
                              "inline-flex cursor-pointer items-center justify-center rounded-sm border border-dashed px-3 py-2.5 text-sm font-medium transition",
                              form.pronoun === value
                                ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                                : "border-zinc-200 bg-zinc-50/60 text-zinc-700 hover:border-zinc-300 hover:bg-white",
                            )}
                          >
                            <input
                              type="radio"
                              name="pronoun"
                              value={value}
                              required
                              checked={form.pronoun === value}
                              onChange={() => updateField("pronoun", value)}
                              className="sr-only"
                            />
                            <span className="inline-flex items-center gap-2">
                              {value === "he" ? "He" : "She"}
                              {value === "he" ? (
                                <GenderMaleIcon />
                              ) : (
                                <GenderFemaleIcon />
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </FormSection>

                  <FormSection title="Contact Information">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className={labelClassName}>
                          Email <RequiredMark />
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className={inputClassName}
                          autoComplete="email"
                        />
                      </div>
                      <div>
                        <label htmlFor="mobile" className={labelClassName}>
                          Mobile number <RequiredMark />
                        </label>
                        <input
                          id="mobile"
                          type="tel"
                          required
                          value={form.mobile}
                          onChange={(e) => updateField("mobile", e.target.value)}
                          className={inputClassName}
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                  </FormSection>

                  <FormSection title="Professional Background">
                    <div>
                      <label htmlFor="background" className={labelClassName}>
                        Current background <RequiredMark />
                      </label>
                      <select
                        id="background"
                        required
                        value={form.background}
                        onChange={(e) => {
                          updateField("background", e.target.value);
                          if (e.target.value !== "Other") {
                            updateField("backgroundOther", "");
                          }
                        }}
                        className={cn(inputClassName, "appearance-none")}
                      >
                        <option value="" disabled>
                          Select your current background
                        </option>
                        {backgroundOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <AnimatePresence>
                      {showOtherBackground ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label
                            htmlFor="backgroundOther"
                            className={labelClassName}
                          >
                            Please specify <RequiredMark />
                          </label>
                          <input
                            id="backgroundOther"
                            required
                            value={form.backgroundOther}
                            onChange={(e) =>
                              updateField("backgroundOther", e.target.value)
                            }
                            className={inputClassName}
                            placeholder="Enter your background"
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <div>
                      <label
                        htmlFor="yearsOfExperience"
                        className={labelClassName}
                      >
                        Years of experience <RequiredMark />
                      </label>
                      <input
                        id="yearsOfExperience"
                        type="number"
                        min={0}
                        max={60}
                        required
                        value={form.yearsOfExperience}
                        onChange={(e) =>
                          updateField("yearsOfExperience", e.target.value)
                        }
                        className={inputClassName}
                        placeholder="e.g. 3"
                      />
                    </div>
                  </FormSection>

                  <FormSection title="Scheduling & Questions">
                    <div>
                      <label
                        htmlFor="preferredCallDateTime"
                        className={labelClassName}
                      >
                        Preferred date &amp; time for call <RequiredMark />
                      </label>
                      <DatePicker
                        id="preferredCallDateTime"
                        selected={form.preferredCallDateTime}
                        onChange={(date: Date | null) => {
                          updateField("preferredCallDateTime", date);
                          if (date) setDateError(false);
                        }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        placeholderText="Select date and time"
                        className={cn(
                          inputClassName,
                          "webinar-datepicker",
                          dateError && "border-red-300 bg-red-50/40",
                        )}
                        popperClassName="webinar-datepicker-popper"
                        wrapperClassName="w-full"
                      />
                      {dateError ? (
                        <p className="mt-1.5 text-xs font-medium text-red-600">
                          Please select a preferred date and time.
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="specificQuestion"
                        className={labelClassName}
                      >
                        Any specific question{" "}
                        <span className="font-normal normal-case tracking-normal text-zinc-400">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="specificQuestion"
                        rows={3}
                        value={form.specificQuestion}
                        onChange={(e) =>
                          updateField("specificQuestion", e.target.value)
                        }
                        className={cn(inputClassName, "resize-none")}
                        placeholder="Share anything you'd like us to know..."
                      />
                    </div>
                  </FormSection>
                </form>
              )}
            </div>

            {!submitted ? (
              <div className="relative z-10 shrink-0 border-t border-dashed border-zinc-200 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-dashed border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="webinar-registration-form"
                    disabled={upcomingWebinars.length === 0}
                    className="rounded-xl border border-zinc-900 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-300"
                  >
                    Submit Registration
                  </button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
