import cn from "classnames";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";

const Appointment = () => {
  const { openModal, setModalView } = useUI();

  function handleBooking() {
    setModalView("BOOKING_VIEW");
    return openModal();
  }
  return (
    <div className={cn("pb-6 md:pb-7 leading-7 text-sm text-gray-600")}>
      <p>
        Thank you for visiting our booking page. Please read all information
        before booking
      </p>

      <p className="font-bold">
        Location: FATİH MAHALLESI, SOKAK 851, NO: 15, ESENYURT/İSTANBUL 34513
      </p>

      <p>
        We accept any type of hair, or you can contact us via email or our
        Instagram if you want us to provide the unit. Appointment is for
        Wahsing, Hair Treatment, Collection, Installation {"&"} Styling only.
        All wigs are made before or prior to collection/installation.
      </p>

      <p className="font-bold my-2 text-lg">
        FOR WIG REVAMPING OR CUSTOMIZATION
      </p>
      <ul className="mb-5" style={{ listStyle: "disc" }}>
        <li>
          Please make sure you send or drop off your hair {"&"} closure/frontal
          2/3days before the date of your appointment.
        </li>
        <li>Please identify your cap size in the form.</li>
        <li>
          Due to customization process, we need to get your hair on time for it
          to be ready for your appointment.
        </li>
      </ul>

      <p>
        <span className="font-bold ">Deposit/cancellation: </span>
        To secure your slot, a non-refundable $2 deposit is required (This will
        be added to your total bill). In the events of cancellation, this
        deposit is non-refundable.{" "}
      </p>

      <p>
        {" "}
        However, you can reschedule your appointment using the same deposit if
        done 48hr before your appointment. You can only reschedule using the
        same deposit once. The deposit will be deducted from the total price and
        the remaining fee must be paid on the day of your appointment.
      </p>

      <p>
        {" "}
        Our Address will be sent to your contact for postage immediately after
        bookings has been confirmed.
      </p>

      <p> Thank you again, looking forward to meeting you.</p>

      <p className="text-lg font-bold"> TimTrave</p>
      <div className="mt-5">
        <Button
          className="w-full h-12 sm:w-auto"
          onClick={handleBooking}
          //loading={isLoading}
          //disabled={isLoading}
        >
          Book Appoitment
        </Button>
      </div>
    </div>
  );
};

export default Appointment;
