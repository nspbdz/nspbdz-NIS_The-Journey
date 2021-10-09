import { Component } from "react";
import { useState, useEffect } from "react";
// export class LifeCycle extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data: null,
//       loading: true,
//     };
//   }

//   // Execeute when component has mount to the DOM
//   componentDidMount() {
//     console.log("mounting component at:\n", new Date().toLocaleTimeString());
//     setTimeout(() => {
//       this.setState((state) => ({
//         data: {
//           name: "Sukma",
//           desc: "Simple man",
//         },
//         loading: false,
//       }));
//     }, 3000);
//   }

//   componentDidUpdate() {
//     console.log("update component at: \n", new Date().toLocaleTimeString());
//   }

//   componentWillUnmount() {
//     console.log("unmounting component at: \n", new Date().toLocaleTimeString());
//     this.setState((state) => ({
//       data: null,
//       loading: true,
//     }));
//   }

//   render() {
//     const { loading, data } = this.state;
//     return (
//       <>
//         {loading && <p>loadingg...</p>}
//         {!loading && (
//           <>
//             <h1>{data.name}</h1>
//             <p>{data.desc}</p>
//           </>
//         )}
//       </>
//     );
//   }
// }

const LifeCycle = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("mounting component at:\n", new Date().toLocaleTimeString());
    setTimeout(() => {
      setData({
        name: "Sukma",
        desc: "Simple man",
      });

      setLoading(false);
    }, 3000);
    return () => {
      console.log(
        "unmounting component at:\n",
        new Date().toLocaleTimeString()
      );
      setData(null);
      setLoading(true);
    };
  }, []);

  return (
    <div>
      <>
        {loading && <p>loadingg...</p>}
        {!loading && (
          <>
            <h1>{data.name}</h1>
            <p>{data.desc}</p>
          </>
        )}
      </>
    </div>
  );
};

export default LifeCycle;
