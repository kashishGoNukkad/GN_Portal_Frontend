import Image from 'next/image'
import React from 'react'
import TempHeader from '../admindashboard/Components/TempHeader'
import SearchComponent from '../admindashboard/Components/SearchComponent'
import PopularCategory from '../admindashboard/Components/PopularCategory'
import FeatureCategory from '../admindashboard/Components/FeatureCategory'
import Chooseus from '../admindashboard/Components/ChooseUS'
import PostJob from '../admindashboard/Components/PostJob'
import Stats from '../admindashboard/Components/Stats'
import Footer from '../admindashboard/Components/Footer'
 

const Templatepage = () => {
  
  return (
<>
<TempHeader/>
<SearchComponent />
<PopularCategory/>
<FeatureCategory/>
<Chooseus/>
<PostJob/>
<Stats/>
<Footer/>
</>
  )
}

export default Templatepage