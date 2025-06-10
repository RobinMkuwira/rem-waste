import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
    // step state
    const [step, setStep] = useState<number>(-1)

    // sets the selected step
    const stepperState = useSelector((state: any) => state.stepper)

    useEffect(() => {
        if (stepperState !== null && stepperState !== undefined) {
            const index = stepperState.payload

            // set the stepper
            setStep(index)
        }
    }, [step, stepperState])

    return (
        <div className="fixed w-full z-10 bg-white top-10 pb-4 shadow-sm">
            <div className="md:hidden mt-6"/>
            {/* the step titles, this is hidden on small screen*/}
            <div className="md:flex hidden items-center col-span-full mx-4 mt-4">
                <span className="text-xs font-medium text-gray-600">Postcode</span>
                <div className="flex-auto cursor-pointer border-0"></div>
                <span className="text-xs font-medium text-gray-600">Waste Type</span>
                <div className="flex-auto cursor-pointer border-0"></div>
                <span className="text-xs font-medium text-gray-600">Select Skip</span>
                <div className="flex-auto cursor-pointer border-0"></div>
                <span className="text-xs font-medium text-gray-600">Permit Check</span>
                <div className="flex-auto cursor-pointer border-0"></div>
                <span className="text-xs font-medium text-gray-600">Select Date</span>
                <div className="flex-auto cursor-pointer border-0"></div>
                <span className="text-xs font-medium text-gray-600">Payment</span>
            </div>
            {/* the steps */}
            <div className="flex items-center col-span-full mx-8 mt-2">
                <span className={ step === 0 ? 'mr-0.5 animate-pulse cursor-pointer text-xs font-medium main-color main-ring-color ring-2 text-white py-0 px-1' : 'mr-0.5 cursor-pointer text-xs font-medium main-color main-ring-color ring-2 text-white py-0 px-1'}>1</span>
                <div className="flex-auto cursor-pointer animate-pulse border-t-2 transition duration-500 ease-in-out main-color-border"></div>
                <span className={step >= 1 ? 'mx-0.5 cursor-pointer text-xs font-medium main-color main-ring-color ring-2 text-white py-0 px-1' : 'mx-0.5 cursor-pointer text-xs font-medium main-ring-color ring-2 text-gray-500 py-0 px-1'}>2</span>
                <div className="flex-auto cursor-pointer border-t-2 transition duration-500 ease-in-out main-color-border"></div>
                <span className={step >= 2 ? 'mx-0.5 animate-pulse cursor-pointer text-xs font-medium main-color main-ring-color ring-2 text-white py-0 px-1' : 'mx-0.5 cursor-pointer text-xs font-medium main-ring-color ring-2 text-gray-500 py-0 px-1'}>3</span>
                <div className="flex-auto cursor-pointer border-t-2 transition duration-500 ease-in-out  main-color-border"></div>
                <span className={step >= 3 ? 'mx-0.5 animate-pulse cursor-pointer text-xs font-medium main-color main-ring-color ring-2 text-white py-0 px-1' : 'mx-0.5 cursor-pointer text-xs font-medium main-ring-color ring-2 text-gray-500 py-0 px-1'}>4</span>
                <div className="flex-auto cursor-pointer border-t-2 transition duration-500 ease-in-out  main-color-border"></div>
                <span className={step >= 4 ? 'mx-0.5 animate-pulse cursor-pointer text-xs font-medium main-color main-ring-color ring-2 text-white py-0 px-1' : 'mx-0.5 cursor-pointer text-xs font-medium main-ring-color ring-2 text-gray-500 py-0 px-1'}>5</span>
                <div className="flex-auto cursor-pointer border-t-2 transition duration-500 ease-in-out  main-color-border"></div>
                <span className={step >= 5 ? 'mx-0.5 animate-pulse cursor-pointer text-xs font-medium main-color main-ring-color ring-2 text-white py-0 px-1' : 'mx-0.5 cursor-pointer text-xs font-medium main-ring-color ring-2 text-gray-500 py-0 px-1'}>6</span>
            </div>
        </div>
    );
}

export default Navbar;