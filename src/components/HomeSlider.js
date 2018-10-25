import React, { Component } from 'react';
import { View, Platform, ScrollView } from 'react-native';
import styles from '../styles/index.style';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth  } from '../styles/style.style';
import SliderEntry from './SliderEntry';
import axios from 'axios';


const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

class HomeSlider extends Component{
    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            length: 0,
            images: []
        };
    }

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/sliders')
            .then(response => this.setState({ images: response.data.images, length: response.data.length }))
            .catch(error => console.log(error));
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    slider () {
        const { slider1ActiveSlide } = this.state;
        return (
            <View style={styles.exampleContainer}>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={this.state.images}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
                />
                <Pagination
                    dotsLength={this.state.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(4, 7, 49, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={'rgb(168, 171, 196)'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    render(){
        const slider = this.slider();
        return (
            <View style={{height: 205}}>
                <ScrollView
                    style={styles.scrollview}
                    scrollEventThrottle={200}
                    directionalLockEnabled={true}
                >
                    {slider}
                </ScrollView>
            </View>
        );
    }
}

export default HomeSlider;