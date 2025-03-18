import  TeamTable  from "@/components/Home/components/team/TeamTable";
export function TeamWrapper() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <TeamTable />
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3"></div> */}
    </div>
  );
}
