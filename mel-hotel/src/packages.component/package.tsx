export interface IPackageDeal {
  PackageName: string;
  thumbnail: string;
}
export default function PackageDeal({ PackageName, thumbnail }: IPackageDeal) {
  return (
    <>
      <main id="packageCard" className="w-1/4 rounded p-2 shadow">
        <img src={thumbnail} className="" alt="room" />

        <h1 className="font-fauna">{PackageName}</h1>
      </main>
    </>
  );
}
