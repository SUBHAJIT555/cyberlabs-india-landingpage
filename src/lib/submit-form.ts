const SUBMIT_URL =
  process.env.NEXT_PUBLIC_FORM_SUBMIT_URL ?? "http://localhost/cyberlabs/submit.php";

export type SubmitFormResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function submitForm(
  data: Record<string, unknown>,
): Promise<SubmitFormResult> {
  try {
    const response = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
      error?: string;
    };

    if (!response.ok) {
      return {
        success: false,
        error: result.error ?? "Something went wrong. Please try again.",
      };
    }

    return {
      success: true,
      message: result.message ?? "Submitted successfully.",
    };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
