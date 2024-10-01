import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex min-h-screen p-12 justify-center">
      <SignIn />
    </div>
  );
}
