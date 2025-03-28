import Exerciselist from "@/components/exercise/exercise-list";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className='mx-auto max-w-screen-lg px-4 w-full flex flex-col h-full py-2'>
        <Exerciselist
        />
      </div>
    </div>
  );
}
