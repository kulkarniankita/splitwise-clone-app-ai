import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex min-h-screen p-12 justify-center">
      <SignUp />
    </div>
  );
}
