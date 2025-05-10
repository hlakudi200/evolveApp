import NavigationComponent from "@/app/_components/driver/drive/drive";

const DrivePage=()=> {
  return (
    <div className="min-h-screen bg-black" style={{height:"87vh", overflowY:"scroll"}}>
      <NavigationComponent destination={{ lat: 6.5244, lng: 3.3792 }} />
    </div>
  );
}

export default DrivePage;