import React from "react";
import { getswapsrequested } from "../../services/vanService";
import Swap from "../../components/Swap/swap.js";

class SwapsRequested extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
        swaps: [],
    };
  }
  //   const [id, setId] = useState("");
  //   setId(props.id);
  //   const [swaps, setSwaps] = useState("");

  //   useEffect(() => {
  //     getswapsrequested({ id: { id } })
  //       .then((response) => {
  //         console.log("Response from getswapsrequested service is:", response);
  //         setSwaps([...response.Swaps]);
  //       })
  //       .catch((err) => console.log(err));
  //   });
  componentDidMount = () => {
    console.log("swapsrequested props=", this.props);
    getswapsrequested({ id: this.state.id })
      .then((response) => {
          console.log("response from getswapsrequested=", response.Swaps)
        this.setState({
          swaps: response.Swaps,
        });
        console.log("swapsrequested=", this.state.swaps);
      })
      .catch((err) => console.log(err));
  };

  //   addSwaps = (data) => {
  //     this.setState({
  //       swaps: [...data],
  //     });
  //   };

  render() {
    const {swaps} = this.state.swaps;
    console.log("swaps=", {swaps});
    const details = swaps.map((swap) => {
      return (
        <Swap
          van={swap.van}
          startdate={swap.startdate}
          enddate={swap.enddate}
          additionalinfo={swap.additionalInfo}
          vanowner={swap.vanowner}
          accepted={swap.accepted}
          id={swap._id}
          key={swap._id}
        ></Swap>
      );
    });
    //   const listofswaps = { swaps };
    //   const details = () => {
    //     listofswaps.map((swap, index) => {
    //       return (
    //         <Swap
    //           van={swap.van}
    //           startdate={swap.startdate}
    //           enddate={swap.enddate}
    //           additionalinfo={swap.additionalInfo}
    //           vanowner={swap.vanowner}
    //           accepted={swap.accepted}
    //           id={swap._id}
    //           key={index}
    //         ></Swap>
    //       );
    //     });
    //   };
    return (
      <div>
        <div className="vanviewbox">{details}</div>
      </div>
    );
  }
}

export default SwapsRequested;
