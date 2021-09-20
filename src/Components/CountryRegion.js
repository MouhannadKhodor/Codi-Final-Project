import React, { Component, useState } from 'react';

// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to 
// keep file size down
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


// class CountryRegion extends Component {
//   constructor (props) {
//     super(props);
//     this.state = { country: '', region: '' };
//   }

//   selectCountry (val) {
//     this.setState({ country: val });
//   }

//   selectRegion (val) {
//     this.setState({ region: val });
//   }

//   render () {
//     const { country, region } = this.state;
//     return (
//       <div>
//         <CountryDropdown
//         className="input-group-text"
//           value={country}
//           onChange={(val) => this.selectCountry(val)} />
//         <RegionDropdown
//         className="input-group-text"
//           country={country}
//           value={region}
//           onChange={(val) => this.selectRegion(val)} />
//       </div>
//     );
//   }
// }


function CountryRegion() {
   
    
  return (
    <>
      
    </>
  )
}



export default CountryRegion