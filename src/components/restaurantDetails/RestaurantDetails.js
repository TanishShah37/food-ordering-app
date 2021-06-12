import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import './restaurantStyle.scss'
import Dish from '../cart/Dish '


function RestaurantDetails (props) {
  const [resData, setData] = useState(null)

  useEffect(() => {
    let res
    if (!props.res && localStorage.getItem('resData') !== '') {
      res = localStorage.getItem('resData')
    } else {
      res = props.res
    }
    axios
      .get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${res}`, {
        headers: {
          'user-key': '7a77149c434216ebc2ae733a22ab3839'
        }
      })
      .then(data => {
        setData(data)
        if (props.res) {
          localStorage.setItem('resData', props.res)
        }
      })
      .catch(error => {
        swal('Something went wrong!', error.message, 'error')
      })
  }, [props.res])

  let imgUrl = resData
    && resData.data.featured_image && (resData.data.featured_image !== "" || resData.data.featured_image
!== undefined || resData.data.featured_image !== null)
      ? resData.data.featured_image 
    : 'https://b.zmtcdn.com/data/res_imagery/17806994_RESTAURANT_4fb2520c85f9936ec0524b4efda6e62a_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'

  imgUrl = "https://b.zmtcdn.com/data/res_imagery/17806994_RESTAURANT_4fb2520c85f9936ec0524b4efda6e62a_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"

  return (
    <div>
      {resData ? (
        <div className='resDetails_container'>
          <div className='resDetails_inner_container'>
            <div className='dish_img_area'>
              <img src={imgUrl} alt='Restaurant Img' />
            </div>
            <div className='resDetails_right_container'>
              <div className='res_titleX'>{resData.data.name}</div>
              <div className='res_cuisinesX'>{resData.data.cuisines}</div>
              <div className='res_locationX'>
                {resData.data.location.locality}
              </div>
              <div className='res_timingX'>{resData.data.timings}</div>

              <div className='cost_rateX'>
                <div className='res_ratingX'>
                  <i class='fa fa-star' aria-hidden='true'></i>{' '}
                  {resData.data.user_rating.aggregate_rating}
                  <span className='res_ratingX_sub'>
                    {resData.data.user_rating.votes}+ Ratings
                  </span>
                </div>
                <div className='res_costX'>
                  <i class='fa fa-inr' aria-hidden='true'></i>{' '}
                  {resData.data.average_cost_for_two}
                  <span className='res_costX_sub'>Cost for Two</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading Restaurant Data</p>
      )}
      <Dish />
    </div>
  )
}

export default RestaurantDetails
