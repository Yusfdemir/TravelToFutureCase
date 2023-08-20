import React from "react";
import { useState} from 'react'   
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { airports } from "../mocks/data";

const FlightApp = () => {
  // handle event
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const [loading,setLoading]=useState();
  const [tickets,setTickets]=useState([]);
  const [isOneWay,setIsOneWay]=useState(false);

  const loadTickets=async(from,to,departureDate,returnDate)=>{
    setLoading(true)
    const response =await (await fetch(`/tickets?from=${from}&to=${to}&departureDate=${departureDate}&returnDate=${returnDate}`)).json();
    setTickets(response.data)
    setLoading(false)

  }
  // handle submit
  const onSubmit = (data) =>{
    loadTickets(data.departure,data.arrival,data.departureDate,data.returnDate)
  }
  return (
    <React.Fragment>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white w-auto h-auto pb-10 mt-5 mx-5 px-5 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
            {/* header section */}
            <div className="h-24 flex justify-center items-center shadow ">
              <p className="uppercase font-bold text-4xl text-center">
                Amadeus Travel to Future
              </p>
            </div>

            {/* body section */}
            <div>
              <div className="grid justify-center space-y-5 bg-indigo-50 pb-10">
                <div>
                  <div className="flex justify-around space-x-8 mt-5">
                    <div className="flex items-center space-x-2">
                      <input onClick={()=>{setIsOneWay(false);console.log(isOneWay)}}
                        type="radio"
                        className={`w-6 h-6 ${
                          errors.tripType &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"
                        }`}
                        value="round trip"
                        {...register("tripType", {
                          required: {
                            value: true,
                            message: "Trip type is required",
                          },
                        })}
                      />
                      <p className="text-xl font-bold uppercase">Round trip</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input onClick={()=>{setIsOneWay(true);console.log(isOneWay)}}
                        type="radio"
                        className={`w-6 h-6 ${
                          errors.tripType &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"
                        }`}
                        value="one way"
                        {...register("tripType", {
                          required: {
                            value: true,
                            message: "Trip type is required",
                          },
                        })}
                      />
                      <p className="text-xl font-bold uppercase">one way</p>
                    </div>
                  </div>
                  <div>
                    {errors.tripType && (
                      <span className="text-sm text-red-500">
                        {errors.tripType.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* departure section */}
                <div>
                  <div>
                    <div className="relative">
                      <p className="font-bold text-xl uppercase">flying from</p>
                      <select
                        className={`w-full h-16 text-2xl pl-20 rounded-lg ${
                          errors.departure &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"
                        }`}
                        {...register("departure", {
                          required: {
                            value: true,
                            message: "Departure is required",
                          },
                        })}
                      >
                        <option value="" selected disabled hidden>
                          --Select Airport--
                        </option>
                        {airports.map((airport,index)=>(
                            <option key={index} value={airport.city}>{airport.name}</option>
                        ))}
                        
                      </select>
                      <FaPlaneDeparture className="text-4xl absolute left-5 top-10 " />
                    </div>
                    <div>
                      {errors.departure && (
                        <span className="text-sm text-red-500">
                          {errors.departure.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* arrival section */}
                <div >
                  <div>
                    <div className="relative">
                      <p className="font-bold text-xl uppercase">flying to</p>
                      <select 
                      className={`w-full h-16 text-2xl pl-20 rounded-lg ${
                        errors.arrival &&
                        " focus:border-red-500 focus:ring-red-500 border-red-500"
                      }`}
                      {...register("arrival", {
                        required: {
                          value: true,
                          message: "Arrival is required",
                        },
                      })}
                      >
                        <option value="" selected disabled hidden>
                          --Select Airport--
                        </option>
                        {airports.map((airport,index)=>(
                            <option key={index} value={airport.city}>{airport.name}</option>
                        ))}
                        
                      </select>
                      <FaPlaneArrival className="text-4xl absolute left-5 top-10 " />
                    </div>
                    <div>
                    {errors.arrival && (
                        <span className="text-sm text-red-500">
                          {errors.arrival.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* date section */}
                <div className="flex space-x-2">
                  {/* departure section */}
                  <div className="w-1/2">
                    <div>
                      <div className="relative">
                        <p className="font-bold text-xl uppercase">
                          departure date
                        </p>
                        <input
                          type="date"
                          className={`w-full h-16 text-2xl rounded-lg ${errors.departureDate &&
                            " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                          {...register("departureDate", {
                            required: {
                              value: false,
                              message: "Departure date is required",
                            },
                          })}
                        />
                      </div>
                      <div>
                      {errors.departureDate && (
                        <span className="text-sm text-red-500">
                          {errors.departureDate.message}
                        </span>
                      )}
                      </div>
                    </div>
                  </div>

                  {/* return section */}
                  
                  <div className="w-1/2">
                    <div>
                      <div className="relative">
                        <p className="font-bold text-xl uppercase">
                          return date
                        </p>
                        <input
                            disabled={isOneWay? true : false}
                          type="date"
                          className={`w-full h-16 text-2xl rounded-lg ${errors.returnDate &&
                            " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                          {...register("returnDate", {
                            required: {
                              value: false,
                              message: "Return date is required",
                            },
                          })}
                        />
                      </div>
                      <div>
                      {errors.returnDate && (
                        <span className="text-sm text-red-500">
                          {errors.returnDate.message}
                        </span>
                      )}
                      </div>
                    </div>
                  </div>
                </div>

               
                {/* button section */}
                <div>
                  <input
                    type="submit"
                    value="Find flight"
                    className="w-full h-16 font-bold text-3xl uppercase rounded-lg bg-green-100 hover:bg-white"
                  />
                </div>
                {/*Tickets */}
                {loading && (
                    <div class="text-center">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                )}  
                {tickets?.map((ticket,index)=>(
                    <div key={index} className='w-full align-middle  text-xl bg-white rounded-lg pl-3'>
                        <p><span className="font-bold">From:</span> {ticket.from}</p>
                        <p><span className="font-bold">To:</span> {ticket.to}</p>
                        <p><span className="font-bold">Departure Date:</span> {ticket.departureDate} </p>
                        {isOneWay?'':<p><span className="font-bold">Return Date:</span> {ticket.returnDate}</p>}
                    </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default FlightApp;
