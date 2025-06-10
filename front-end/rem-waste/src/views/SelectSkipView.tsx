import Navbar from "../components/Navbar";
import Stepper from '../components/Stepper'
import SelectSkipComponent from "../components/SelectSkipComponent";

function SelectSkipView() {
    return (
        <div className="App">
            {/* the navbar */}
            <Navbar/>
            {/* the stepper */}
            <Stepper/>
            {/* the skip component */}
            <SelectSkipComponent/>
        </div>
    );
}

export default SelectSkipView;