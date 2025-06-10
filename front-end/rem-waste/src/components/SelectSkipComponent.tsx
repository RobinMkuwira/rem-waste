import { useEffect, useState } from "react";
import generalSkip from '../assets/4-yarder-skip.jpg'
import twentyYardSkip from '../assets/20-yarder-skip.jpg'
import fourtyYardSkip from '../assets/20-yarder-skip.jpg'
import { useDispatch, useSelector } from "react-redux";
import { ajax } from 'rxjs/ajax'

function SelectSkipComponent() {
    // the skips data array
    const [skips, setSkips] = useState<any[]>([])

    // the skips data array that will be manipulated by the user
    const [skipsData, setSkipsData] = useState<any[]>([])
    
    // the sorting in an ascending order if true else in a descending order by the skip size
    const [sortAscending, setSortAscending] = useState<boolean>(true)

    // sets the selected skip
    const [selectedSkip, setSelectedSkip] = useState<any>()

    // the text for filtering/searching the data
    const [filterText, setFilterText] = useState<string>()

    // sets the data loading progress
    const [loading, setLoading] = useState<boolean>(false)

    // set redux
    const dispatch = useDispatch()
    const skipState = useSelector((state: any) => state.skip)

    // selects the skip
    function skipSelection (skip: any) {
        const oldSkip = selectedSkip
        setSelectedSkip(skip)
        if (oldSkip !== null && oldSkip !== undefined && oldSkip.id === skip.id) {
            setSelectedSkip(null)
             dispatch({ type: 'SET_SKIP', payload: null })
        } else {
            // set the skip in redux
            dispatch({ type: 'SET_SKIP', payload: skip })
        }
    }

    // filters the data based on the text a user has entered
    function filterData (filter: string) {
        const data: any[] = skips
        const size = data.length
        const searchResults = []

        // reset the skipData
        setSkipsData([])

        // loop throu the skips data and filter it
        for (let i = 0; i < size; i++) {
            const skip = data[i]

            // stringify the skip data
            const skipString = JSON.stringify(skip).toLocaleLowerCase()
            if (skipString.includes(filter.toLocaleLowerCase()))  {
                searchResults.push(skip)
            } 
        }

        // set the searched results into the skip data
        setSkipsData(searchResults)
        setFilterText(filter)
    }

    // sort the data
    function sortSkips (state: boolean) {
        const data: any[] = skipsData
           
        // reset the skips data
        setSkipsData([])

        // sort in ascending order
        if (state) {
            data.sort((a, b) => a.size - b.size)
        } else {
            // sort in a descending order
            data.sort((a, b) => b.size - a.size)
        }

        // set the new skips data
        setSkipsData(data)

        // set the sort state
        setSortAscending(state)
    }

    // the function that populates the skips data array
    function getSkipData () {
        setLoading(true)
        const observable = ajax ({
            url: `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`,
            method: 'GET'
        })

        const observer = {
            next: (response: any) => {
                var data: any[]  = response.response
                const size = data.length
                
                // add the skip images
                for (let i = 0; i < size; i++) {
                    const skipSize = data[i].size
                    
                    if (skipSize === 20) {
                        data[i].image = twentyYardSkip
                    } else if (skipSize === 40) {
                        data[i].image = fourtyYardSkip
                    } else {
                        data[i].image = generalSkip
                    }
                }

                // set the skip data & skips data array data
                setSkips(data)
                setSkipsData(data)

                // stop the loading progress
                setLoading(false)
            },
            error: (error: any) => {
                const status = error.status
                console.log(error, status)
                // stop the loading progress
                setLoading(false)
            },
            complete: () => {}
        }

        observable.subscribe(observer)

    }
    

    useEffect(() => {
        // get the skip data
        getSkipData()
        // set the header
        dispatch({ type: 'SET_STEPPER', payload: 2 })
        if (skipState !== null && skipState !== undefined && skipState.payload) {
            setSelectedSkip(skipState.payload)
        }
    }, [dispatch, skipState])

    return (
        <div className='mx-4 my-32 border pb-6 shadow-md space-y-10'>
            {
                loading ?
                (
                    <div className="loader mb-4"></div>
                )
                :
                (
                    <div className="mb-4"></div>
                )
            }
            <div className="px-6 space-y-10" >
                <div className=" space-y-1">
                    <div className="flex">
                        <svg className="h-5 w-5 fill-gray-500" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                            <path d="m23.707,22.293l-5.969-5.969c1.412-1.725,2.262-3.927,2.262-6.324C20,4.486,15.514,0,10,0S0,4.486,0,10s4.486,10,10,10c2.398,0,4.6-.85,6.324-2.262l5.969,5.969c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023,0-1.414ZM2,10C2,5.589,5.589,2,10,2s8,3.589,8,8-3.589,8-8,8S2,14.411,2,10Zm9-4v8c0,.553-.448,1-1,1s-1-.447-1-1V6c0-.553.448-1,1-1s1,.447,1,1Zm3,3v2c0,.553-.448,1-1,1s-1-.447-1-1v-2c0-.553.448-1,1-1s1,.447,1,1Zm-6-1v4c0,.553-.448,1-1,1s-1-.447-1-1v-4c0-.553.448-1,1-1s1,.447,1,1Z"/>
                        </svg>
                        <span className=" text-xs font-medium text-gray-500">Search</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <input
                            className='w-full border text-xs border-gray-300 py-4 px-3 shadow-sm focus:outline-none focus:border-gary-500 focus:ring-1 bg-gray-50 focus:ring-gray-500'
                            placeholder='Search for a skip'
                            type="text"
                            value={filterText}
                            onChange={(e) => filterData(e.target.value)}
                        />
                        <div className="cursor-pointer">
                            {
                                sortAscending ?
                                ( 
                                    <svg onClick={()=> {sortSkips(false)}} className="h-5 w-5 fill-gray-500 hover:fill-gray-600" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M24,8c0,.553-.447,1-1,1H10c-.552,0-1-.447-1-1s.448-1,1-1h13c.553,0,1,.447,1,1Zm-4,4H10c-.552,0-1,.447-1,1s.448,1,1,1h10c.553,0,1-.447,1-1s-.447-1-1-1Zm-3,5h-7c-.552,0-1,.447-1,1s.448,1,1,1h7c.553,0,1-.447,1-1s-.447-1-1-1Zm-3,5h-4c-.552,0-1,.447-1,1s.448,1,1,1h4c.552,0,1-.447,1-1s-.448-1-1-1ZM9.121,3.293L6.413,.584c-.779-.777-2.047-.778-2.828,0L.878,3.293c-.391,.391-.391,1.023,0,1.414s1.024,.391,1.414,0l1.708-1.708V23c0,.553,.448,1,1,1s1-.447,1-1V2.999l1.707,1.708c.195,.195,.451,.293,.707,.293s.512-.098,.707-.293c.391-.391,.391-1.023,0-1.414Z"/></svg>
                                )
                                :
                                (
                                    <svg onClick={()=> {sortSkips(true)}} className="h-5 w-5 fill-gray-500 hover:fill-gray-600" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M24,1c0,.553-.448,1-1,1H10c-.552,0-1-.447-1-1s.448-1,1-1h13c.552,0,1,.447,1,1Zm-4,4H10c-.552,0-1,.447-1,1s.448,1,1,1h10c.552,0,1-.447,1-1s-.448-1-1-1Zm-3,5h-7c-.552,0-1,.447-1,1s.448,1,1,1h7c.552,0,1-.447,1-1s-.448-1-1-1Zm-3,5h-4c-.552,0-1,.447-1,1s.448,1,1,1h4c.552,0,1-.447,1-1s-.448-1-1-1Zm-4.879,4.293c-.391-.391-1.023-.391-1.414,0l-1.707,1.707V1c0-.553-.448-1-1-1s-1,.447-1,1V21l-1.708-1.708c-.391-.391-1.023-.391-1.414,0s-.391,1.023,0,1.414l2.707,2.707c.39,.39,.902,.585,1.415,.585s1.024-.195,1.414-.585l2.707-2.707c.391-.391,.391-1.023,0-1.414Z"/></svg>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='relative grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {
                        skipsData.map((data, i) => (
                            <div className={ selectedSkip !== null && selectedSkip !== undefined && selectedSkip.id !== undefined && selectedSkip.id !== null && selectedSkip.id === data.id ? 'border-4 shadow-md border-yellow-500' : 'border shadow-md'} key={data.id}>
                                {/* the skip image */}
                                <div>
                                    <img className='w-full h-60' src={data.image} alt='skip'/>
                                </div>
                                {/* the skip details */}
                                <div className="py-2 px-2.5">
                                    {/* skip size */}
                                    <div>
                                        <span className="text-xs font-bold text-gray-600">{data.size} Yard Skip</span>
                                    </div>
                                    {/* skip period */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-600">{data.hire_period_days} Days Hire Period</span>
                                    </div>
                                    {/* price before vat */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-600 bg-blue-200 px-2">Price Before VAT:  £{data.price_before_vat} </span>
                                    </div>
                                    {/* transport cost */}
                                    <div>
                                        {
                                            data.transport_cost !== null ?
                                            (
                                                <span className="text-xs font-medium text-gray-600">Transport Cost: £{data.transport_cost}</span>
                                            )
                                            :
                                            (
                                                <span className="text-xs font-medium text-gray-600 bg-red-100 line-through">Transport Cost: £0</span>
                                            )
                                        }
                                    </div>
                                    {/* transport cost */}
                                    <div>
                                        {
                                            data.transport_cost !== null ?
                                            (
                                                <span className="text-xs font-medium text-gray-600">Const Per Tonne: £{data.per_tonne_cost}</span>
                                            )
                                            :
                                            (
                                                <span className="text-xs font-medium text-gray-600 bg-red-100 line-through">Cost Per Tonne: £0</span>
                                            )
                                        }
                                    </div>
                                    {/* skip vat */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-600 bg-blue-100 px-2">£{data.vat} VAT</span>
                                    </div>
                                    {/* allowed on the road */}
                                    <div>
                                        {
                                            data.allowed_on_road ?
                                            (
                                                <span className="text-xs font-medium text-gray-600 bg-green-100 px-2">The Skip is Allowed on the Road</span>
                                            )
                                            :
                                            (
                                                <span className="text-xs font-medium text-gray-600 bg-red-100 px-2">The Skip is not Allowed on the Road</span>
                                            )
                                        }
                                    </div>
                                    {/* allows heavy waste */}
                                    <div>
                                        {
                                            data.alloww_heavy_waste ?
                                            (
                                                <span className="text-xs font-medium text-gray-600 bg-green-100 px-2">Heavy Waste is Allowed in the Skip</span>
                                            )
                                            :
                                            (
                                                <span className="text-xs font-medium text-gray-600 bg-red-100 px-2">Heavy Waste is not Allowed in the Skip</span>
                                            )
                                        }
                                    </div>
                                    <div className="flex mx-auto justify-center mb-2 mt-4">
                                        {/* the skip selection button */}
                                        <button onClick={() => {skipSelection(data)}} className={ selectedSkip !== null && selectedSkip !== undefined && selectedSkip.id !== undefined && selectedSkip.id !== null && selectedSkip.id === data.id ? 'bg-yellow-600 focus:ring-0 text-white text-xs p-1.5 px-6 rounded-sm hover:bg-yellow-700 font-medium' : 'main-color focus:ring-0 text-white text-xs p-1.5 px-6 rounded-sm hover:bg-gray-800 font-medium'}>
                                            {
                                                selectedSkip !== null && selectedSkip !== undefined && selectedSkip.id !== undefined && selectedSkip.id !== null && selectedSkip.id === data.id ?
                                                (
                                                    <span>Selected the {data.size} Yards Skip</span>
                                                )
                                                :
                                                (
                                                    <span>Select the {data.size} Yards Skip</span>
                                                )
                                            } 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    selectedSkip !== null && selectedSkip !== undefined && selectedSkip.id !== undefined && selectedSkip.id !== null ?
                    (
                        <div className="flex  justify-center border-0">
                            <div className="w-full align-middle fixed -bottom-0.5 border-0 text-left bg-black opacity-90 md:opacity-85 py-4 shadow-xl flex-1 justify-between rounded-t-sm space-y-5">
                                <div className="flex-md items-center space-x-2 text-center w-full">
                                    <div>
                                        <span className="text-white text-xs">Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.</span>
                                    </div>
                                </div>
                                <div className="flex-1 md:flex text-left mx-6 sm:mt-1 md:justify-between justify-center">
                                    <div className="space-x-4">
                                        <span className="text-white text-xs font-bold">Selected the {selectedSkip.size} Yard Skip</span>
                                        <span className="text-red-500 text-xs font-bold"> £{selectedSkip.price_before_vat} Before VAT</span>
                                        <span className="text-white text-xs font-bold">{selectedSkip.hire_period_days} Days Hire</span>
                                    </div>
                                    <div className="space-x-4 md:space-x-2 flex justify-center my-4 md:my-0">
                                        <button className="text-xs text-white bg-gray-700 hover:bg-gray-600 px-8 py-1.5 rounded-sm shadow-sm font-medium">Back</button>
                                        <button className="text-xs text-white bg-yellow-600 hover:bg-yellow-700 px-5 py-1.5 rounded-sm shadow-sm font-medium">Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <></>
                    )
                }
            </div>
        </div>
    );
}

export default SelectSkipComponent;