'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Simple Select component (replace with a proper UI library component if desired)
const Select = ({ label, value, onChange, options, required }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: { value: string; label: string }[], required?: boolean }) => (
  <div>
    <label className="block text-sm font-medium text-[#5C6D49]">{label}</label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49] bg-white"
    >
      <option value="" disabled>{`Select ${label}...`}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default function SignUp() {
  const router = useRouter();

  // State for all form fields
  const [companyName, setCompanyName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [companyDetail, setCompanyDetail] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [foundingYear, setFoundingYear] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [registrationDocument, setRegistrationDocument] = useState<File | null>(null); // State for the file
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [password, setPassword] = useState(''); // Keep password fields
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRegistrationDocument(e.target.files[0]);
    } else {
      setRegistrationDocument(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError('You must accept the terms of service');
      setIsLoading(false);
      return;
    }

    // --- File Upload Logic Placeholder ---
    // **IMPORTANT:** Actual file upload to Supabase Storage needs to happen here.
    // This usually involves making a separate request using Supabase client library (`supabase.storage.from(...).upload(...)`)
    // For this example, we'll just pass the field names, but the API currently ignores the file.
    // You'll need to implement the upload and pass the resulting URL to the API.
    // let uploadedFileUrl = null;
    // if (registrationDocument) {
    //   try {
    //     // const { data, error: uploadError } = await supabase.storage
    //     //   .from('company-documents') // Your bucket name
    //     //   .upload(`public/${registrationDocument.name}`, registrationDocument);
    //     // if (uploadError) throw uploadError;
    //     // uploadedFileUrl = data?.path; // Or construct the full URL
    //     console.log("File selected, implement upload logic here:", registrationDocument.name);
    //   } catch (uploadError: any) {
    //      setError(`Failed to upload document: ${uploadError.message}`);
    //      setIsLoading(false);
    //      return;
    //   }
    // }
    // --- End File Upload Placeholder ---

    try { 
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Include all fields in the request body
          companyName,
          registrationNumber,
          companyAddress,
          phoneNumber,
          email,
          website,
          companyDetail,
          companyType,
          foundingYear,
          companySize,
          // registrationDocumentUrl: uploadedFileUrl, // Send the URL once implemented
          termsAccepted,
          password, // Send password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Use the error message from the API response if available
        throw new Error(data.error || `Registration failed with status: ${response.status}`);
      }

      // Registration successful, now try to sign in
      console.log('Registration successful:', data);

      const result = await signIn('credentials', {
        redirect: false, // Don't redirect automatically, handle it manually
        email,
        password,
      });

      if (result?.error) {
        // Handle sign-in error (e.g., wrong credentials after successful registration? Unlikely but possible)
        console.error("Sign-in after registration failed:", result.error);
        setError('Account created, but auto sign-in failed. Please try logging in manually.');
        // Optionally redirect to login page: router.push('/auth/login');
      } else if (result?.ok) {
        // Sign-in successful, redirect to dashboard or home
        router.push('/'); // Or wherever you want users to go after signup
        router.refresh(); // Refresh server components
      } else {
         setError('Account created, but sign-in status is unknown. Please try logging in manually.');
      }

    } catch (error: any) {
      console.log(error);
      console.error('Registration or Sign-in error:', error);
      // Set the error message state to display it to the user
      setError(error.message || 'An unexpected error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Mock Options for Selects (Replace with real data if needed) ---
  const companyTypeOptions = [
    { value: 'private_limited', label: 'Private Limited' },
    { value: 'public_limited', label: 'Public Limited' },
    { value: 'llp', label: 'LLP' },
    { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
    { value: 'other', label: 'Other' },
  ];

  const currentYear = new Date().getFullYear();
  const foundingYearOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
  }));

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '500+', label: '500+ employees' },
  ];
  // --- End Mock Options ---


  return (
    // Use a container that allows scrolling if content overflows
    <div className="flex min-h-screen items-center justify-center bg-[#F1F1EF] px-4 py-12">
      <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg"> {/* Increased max-w */}
        <h2 className="mb-8 text-center text-3xl font-bold text-[#0D3D03]">
          Create Account
        </h2>

        {error && (
          <div className="mb-6 rounded-md bg-red-100 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Adjusted form layout for two columns on wider screens */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Use grid for better layout control */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            {/* Column 1 */}
            <div>
              <label className="block text-sm font-medium text-[#5C6D49]">Company Name</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C6D49]">Registration No. of Juristic Person</label>
              <input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C6D49]">Phone Number</label>
              <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]" />
            </div>
             <div>
              <label className="block text-sm font-medium text-[#5C6D49]">Website</label>
              <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]" />
            </div>

             {/* Column 2 */}
             <div>
              <label className="block text-sm font-medium text-[#5C6D49]">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C6D49]">Company Address</label>
              <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]" />
            </div>

             {/* File input - needs styling */}
             <div>
              <label className="block text-sm font-medium text-[#5C6D49]">Company Registration Documents</label>
              <input
                type="file"
                onChange={handleFileChange}
                // Add styling as needed, file inputs can be tricky
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-[#A3AB82] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#5C6D49]"
              />
               {registrationDocument && <p className="mt-1 text-xs text-gray-500">Selected: {registrationDocument.name}</p>}
            </div>
          </div>

          {/* Full width fields */}
           <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-[#5C6D49]">Company Detail</label>
              <textarea value={companyDetail} onChange={(e) => setCompanyDetail(e.target.value)} rows={3} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]" />
            </div>

          {/* Row for Select dropdowns */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
             <Select label="Company Type" value={companyType} onChange={(e) => setCompanyType(e.target.value)} options={companyTypeOptions} required />
             <Select label="Founding Year" value={foundingYear} onChange={(e) => setFoundingYear(e.target.value)} options={foundingYearOptions} required />
             <Select label="Company Size" value={companySize} onChange={(e) => setCompanySize(e.target.value)} options={companySizeOptions} required />
          </div>

          {/* Password Fields */}
           <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
             <div>
                <label className="block text-sm font-medium text-[#5C6D49]">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]" />
             </div>
             <div>
                <label className="block text-sm font-medium text-[#5C6D49]">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]" />
             </div>
           </div>


          {/* Terms and Submit */}
          <div className="flex items-center justify-between pt-4">
             <div className="flex items-center">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#5C6D49] focus:ring-[#5C6D49]"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="/terms-of-service" target="_blank" className="font-medium text-[#5C6D49] hover:text-[#0D3D03]">Term of service</a> {/* Link to your terms */}
                </label>
             </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !termsAccepted} // Disable if loading or terms not accepted
              className="w-full rounded-md bg-[#5C6D49] px-4 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-[#0D3D03] focus:outline-none focus:ring-2 focus:ring-[#5C6D49] focus:ring-offset-2 disabled:bg-[#A3AB82] disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-[#A3AB82]">
          Already have an account?{' '}
          <Link
            href="/auth/login" // Adjust if your login path is different
            className="font-medium text-[#5C6D49] hover:text-[#0D3D03]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}