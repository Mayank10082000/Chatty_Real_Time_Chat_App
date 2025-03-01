import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Loader2, MessageSquare } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({ email: "" });

  const { forgotPassword, isForgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary-content transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Forgot Password?</h1>
              <p className="text-base-content/60">
                Enter email ID below to reset password
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 placeholder:text-base-content/30`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isForgotPassword}
            >
              {isForgotPassword ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              {/* Login{" "} */}
              Remember your password?{" "}
              <Link to="/login" className="link link-primary">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default ForgotPasswordPage;
