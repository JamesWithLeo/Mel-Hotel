export default function Footer() {
  return (
    <main className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-4">
        <h1 className="font-cinzel text-4xl font-medium text-[#4F4A45]">
          Mel Hotel
        </h1>
        <hr className="border-primarydark w-full" />
      </div>
      <section>
        <h1 className="font-serif">Contact us</h1>
        <ul className="indent-4 font-mono text-sm">
          <li>Address: 123 Luxury Lane VoltCity, Philippines</li>
          <li>Phone: +639123456789</li>
          <li>Email: info@melhotel.com</li>
        </ul>
      </section>
      <section>
        <h1 className="font-serif">Follow us</h1>
        <ul className="indent-4 font-mono text-sm">
          <li>
            <a href="https://facebook.com">Fb:Mel Hotel</a>
          </li>
          <li>
            <a href="https://instagram.com">Ig:@Melhotel</a>
          </li>
        </ul>
      </section>
      <section className="flex gap-2 font-mono text-sm">
        <button>Pricacy Policy</button>
        <h1>|</h1>
        <button>Terms & Conditions</button>
      </section>
    </main>
  );
}
