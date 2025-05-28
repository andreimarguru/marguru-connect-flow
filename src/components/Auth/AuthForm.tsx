import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const sendMagicLink = async () => {
    if (!email) return;

    setIsSending(true);
    try {
      const res = await fetch(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/passwordless/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            connection: "email",
            email,
            send: "link", // или "code", если ты хочешь одноразовый код
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to send");

      toast({
        title: "📩 Check your inbox",
        description: "We've sent you a magic login link.",
      });
    } catch (err) {
      toast({
        title: "⚠️ Error",
        description: "Could not send magic link. Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border text-center">
      <h2 className="text-xl font-bold mb-4">Sign in to Marguru</h2>
      <p className="text-sm text-slate-600 mb-6">
        Enter your email to receive a magic link
      </p>
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Button
        onClick={sendMagicLink}
        disabled={isSending || !email}
        className="w-full bg-indigo-600 hover:bg-indigo-700"
      >
        {isSending ? "Sending..." : "Send Magic Link"}
      </Button>
    </div>
  );
};

export default AuthForm;
