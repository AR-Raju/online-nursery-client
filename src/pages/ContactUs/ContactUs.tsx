import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: FieldValues) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the form data to your backend
      // For this example, we'll just simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", values);
      toast.success("Message sent successfully!");
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-nursery-secondary flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-nursery-brown">
            Contact Us
          </h2>
          <p className="mt-2 text-center text-sm text-nursery-sage">
            We'd love to hear from you. Please fill out the form below.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-nursery-green focus:border-nursery-green focus:z-10 sm:text-sm"
                placeholder="Your Name"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message as string}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-nursery-green focus:border-nursery-green focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message as string}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                rows={4}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-nursery-green focus:border-nursery-green focus:z-10 sm:text-sm"
                placeholder="Your message"
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-xs">
                  {errors.message.message as string}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-nursery-primary"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
