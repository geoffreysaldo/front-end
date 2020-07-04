import React, { Component } from 'react';


// import material 

import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch'; 
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

//import theme

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_progress_bar from '../../themes/theme_progress_bar';
import theme_slider from '../../themes/theme_slider.js';


// import api

import { getTime, updateTime, updateTimeDisabled } from '../../services/api_service';
import { isAuthenticated } from '../../services/auth-helper'

const marksJour = [{value: 100,label: '10h',},{value: 92.31, label: '10h30',},{value: 84.35,label: '11h',},{value: 76.66,label: '11h30',},{value: 68.97,label: '12h',},{value: 61.28,label: '12h30',},{ value: 53.59,label: '13h',},{value: 45.9,label: '13h30',},{value: 38.21,label: '14h',},{value: 30.52,label: '14h30',},{value: 22.83,label: '15h',},{value: 15.14,label: '15h30',},{value: 7.45,label: '16h',},{value: 0,label: '16h30',}];
const marksSoir=[{value: 100,label: '16h30',},{value: 92.31,label: '17h',},{value: 84.35,label: '17h30',},{value: 76.66,label: '18h',},{value: 68.97,label: '18h30',},{value: 61.28,label: '19h',},{value: 53.59,label: '19h30',},{value: 45.9,label: '20h',},{value: 38.21,label: '20h30',},{value: 30.52,label: '21h',},{value: 22.83,label: '21h30',},{value: 15.14,label: '22h',},{value: 7.45,label: '22h30',},{value: 0,label: '23h'}]
const lunchMap = new Map().set('10h',100).set('10h30',92.31).set('11h',84.35).set('11h30',76.66).set('12h',68.97).set('12h30',61.28).set('13h',53.59).set('13h30',45.9).set('14h',38.21).set('14h30',30.52).set('15h',22.83).set('15h30',15.14).set('16h',7.45).set('16h30',0)
const dinnerMap = new Map().set('16h30',100).set('17h',92.31).set('17h30',84.35).set('18h',76.66).set('18h30',68.97).set('19h',61.28).set('19h30',53.59).set('20h',45.9).set('20h30',38.21).set('21h',30.52).set('21h30',22.83).set('22h',15.14).set('22h30',7.45).set('23h',0)
const dayMap = new Map().set(0,"Lundi").set(1,"Mardi").set(2,"Mercredi").set(3,"Jeudi").set(4,"Vendredi").set(5,"Samedi").set(6,"Dimanche")

const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `0px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

class Calendrier extends Component {
    constructor(props){
        super(props)
        this.state={
            openTime:[],
            default:[],
            progress:"visible"
        }
        this.handleLunchTime = this.handleLunchTime.bind(this)
        this.handleDinnerTime = this.handleDinnerTime.bind(this)
        this.onSwitchChange = this.onSwitchChange.bind(this)
    }

    componentDidMount(){
      getTime(isAuthenticated()).then(data => {
        data.map((dayTime,index) =>this.setState({
          openTime: [...this.state.openTime,{id:dayTime._id,lunch : {start: lunchMap.get(dayTime.lunchTime.start),stop:lunchMap.get(dayTime.lunchTime.stop),disabled:dayTime.lunchTime.disabled},dinner:{start:dinnerMap.get(dayTime.dinnerTime.start),stop:dinnerMap.get(dayTime.dinnerTime.stop),disabled:dayTime.dinnerTime.disabled}}],
          default: [...this.state.default,{lunch:{start: lunchMap.get(dayTime.lunchTime.start),stop:lunchMap.get(dayTime.lunchTime.stop)}, dinner: {start:dinnerMap.get(dayTime.dinnerTime.start),stop:dinnerMap.get(dayTime.dinnerTime.stop)}}],
          progress: index === data.length - 1 ? 'hidden' : 'visible'
        })
      )})
    }


    handleLunchTime(e,val,idDay, disabled){
      let start = marksJour.find(element => 0.96*val[1] <= element.value && 1.04*val[1] >= element.value)
      let stop = marksJour.find(element => 0.96*val[0] <= element.value && 1.04*val[0] >= element.value)
      updateTime(isAuthenticated(),idDay,"lunchTime",start.label,stop.label,disabled).then(
        () => this.setState(prevState => ({
          openTime: prevState.openTime.map((element,index) => 
            index === idDay ? 
            {...element, lunch: {disabled : element.lunch.disabled, start: start.value, stop:stop.value} , dinner: {disabled : element.dinner.disabled,start: element.dinner.start, stop: element.dinner.stop}} : element 
            )
    })))
    }

    handleDinnerTime(e,val,idDay, disabled){
      let start = marksSoir.find(element => 0.96*val[1] <= element.value && 1.04*val[1] >= element.value)
      let stop = marksSoir.find(element => 0.96*val[0] <= element.value && 1.04*val[0] >= element.value)
      updateTime(isAuthenticated(),idDay,"dinnerTime",start.label,stop.label,disabled).then(
        () => this.setState(prevState => ({
          openTime: prevState.openTime.map((element,index) => 
            idDay === index ? 
            {...element, lunch: {disabled : element.lunch.disabled, start: element.lunch.start, stop:element.lunch.stop} ,dinner: {disabled : element.dinner.disabled,start: start.value, stop: stop.value}}: element )
    })))
    }

    onSwitchChange(id,time,e, startValue, stopValue){
      let start;
      let stop
      if(time == 'lunchTime') {
        start = marksJour.find(element => 0.96*startValue <= element.value && 1.04*startValue >= element.value)
        stop = marksJour.find(element => 0.96*stopValue <= element.value && 1.04*stopValue >= element.value)
      }
      else {
        start = marksSoir.find(element => 0.96*startValue <= element.value && 1.04*startValue >= element.value)
        stop = marksSoir.find(element => 0.96*stopValue <= element.value && 1.04*stopValue >= element.value)
      }
      updateTimeDisabled(isAuthenticated(),id,time,e,start.label,stop.label).then(
          () => this.setState(prevState => ({
            openTime: prevState.openTime.map(element => 
              element.id === id ? 
              time === "lunchTime" ? {...element, lunch: {disabled : !e, start: element.lunch.start, stop:element.lunch.stop}} : {...element,dinner: {disabled : !e,start: element.dinner.start, stop:element.dinner.stop}} 
              : element)
      })))
    }

    render() {
        return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',marginTop:'10px'}}>
          {this.state.progress === 'visible' ? 
                <MuiThemeProvider theme={theme_progress_bar}>
                <Paper style={{marginTop:'10px',height:'25px',width:'95%',display:"flex",flexDirection:"row",justifyContent:'center',background:"#f2f2f2"}}>
                    <LinearProgress style={{visibility:this.state.progress,marginTop:"10px",colorPrimary:"primary", width:'95%'}} />
                </Paper>
                </MuiThemeProvider>
                :
            <Paper style={{display:'flex',flexDirection:'row',alignItems:'center',width:'95%',marginTop:'20px',justifyContent:'flex-start',background:'#f2f2f2'}}>
                {this.state.openTime.map((element,index) => (
                  index === 0 ? <Paper key={index} style={{marginLeft:'10px',display:'flex',flexDirection:'column',alignItems:'center',width:'15%',marginTop:'10px',background:'#f2f2f2',marginBottom:'10px',height:'600px'}}>
                  <div style={{borderRadius:'5px 0px 0px 0px',color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'40px',background:'#343333'}}>{dayMap.get(index)}</div>
                  <div style={{height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',height:'45%',margin:'5%'}}>
                  <MuiThemeProvider theme={theme_slider}>

                  <IOSSwitch checked={element.lunch.disabled} onClick={() => this.onSwitchChange(element.id,"lunchTime",element.lunch.disabled,element.lunch.start, element.lunch.stop)}  />
                        <Slider 
                              disabled={!element.lunch.disabled}
                              step={7.69}
                              min={0}
                              max={100}
                              orientation="vertical"
                              defaultValue={[this.state.default[index].lunch.start, this.state.default[index].lunch.stop]}
                              aria-labelledby="vertical-slider"
                              marks={marksJour}
                              onChangeCommitted={(e,val) => this.handleLunchTime(e,val,index,element.lunch.disabled)}
                          />
                    </MuiThemeProvider>

                    </div>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',height:'45%',margin:'5%'}}>
                    <MuiThemeProvider theme={theme_slider}>

                    <IOSSwitch checked={element.dinner.disabled} onClick={() => this.onSwitchChange(element.id,"dinnerTime",element.dinner.disabled, element.dinner.start, element.dinner.stop)}  />

                      <Slider 
                              disabled={!element.dinner.disabled}
                              step={7.69}
                              color="secondary"
                              orientation="vertical"
                              defaultValue={[this.state.default[index].dinner.start, this.state.default[index].dinner.stop]}
                              aria-labelledby="vertical-slider"
                              marks={marksSoir}
                              onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,index,element.dinner.disabled)}
                          />
                                              </MuiThemeProvider>

                  </div>
                  </div>
                  </Paper> 
                  : index === 6 ?
                  <Paper key={index} style={{marginRight:'10px',display:'flex',flexDirection:'column',alignItems:'center',width:'15%',marginTop:'10px',background:'#f2f2f2',marginBottom:'10px',height:'600px'}}>
                  <div style={{color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',borderRadius:'0px 5px 5px 0px',width:'100%',height:'40px',background:'#343333'}}>{dayMap.get(index)}</div>
                  <div style={{borderRadius:'5px 5px 0px 0px',height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',height:'45%',margin:'5%'}}>
                  <IOSSwitch checked={element.lunch.disabled} onClick={() => this.onSwitchChange(element.id,"lunchTime",element.lunch.disabled,element.lunch.start, element.lunch.stop)}  />
                      <Slider 
                              disabled={!element.lunch.disabled}
                              step={7.69}
                              min={0}
                              max={100}
                              orientation="vertical"
                              defaultValue={[this.state.default[index].lunch.start, this.state.default[index].lunch.stop]}
                              aria-labelledby="vertical-slider"
                              marks={marksJour}
                              onChangeCommitted={(e,val) => this.handleLunchTime(e,val,index,element.lunch.disabled)}
                          />
                          </div>
                          <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',height:'45%',margin:'5%'}}>
                  <IOSSwitch checked={element.dinner.disabled} onClick={() => this.onSwitchChange(element.id,"dinnerTime",element.dinner.disabled, element.dinner.start, element.dinner.stop)}  />
                      <Slider 
                              disabled={!element.dinner.disabled}
                              step={7.69}
                              color="secondary"
                              orientation="vertical"
                              defaultValue={[this.state.default[index].dinner.start, this.state.default[index].dinner.stop]}
                              aria-labelledby="vertical-slider"
                              marks={marksSoir}
                              onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,index,element.dinner.disabled)}
                          />
                  </div>
                  </div>
                  </Paper> 
                  :
                  <Paper key={index} style={{display:'flex',flexDirection:'column',alignItems:'center',width:'15%',marginTop:'10px',background:'#f2f2f2',marginBottom:'10px',height:'600px'}}>
                  <div style={{color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'40px',background:'#343333'}}>{dayMap.get(index)}</div>
                  <div style={{borderRadius:'5px 5px 0px 0px',height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',height:'45%',margin:'5%'}}>
                  <IOSSwitch checked={element.lunch.disabled} onClick={() => this.onSwitchChange(element.id,"lunchTime",element.lunch.disabled,element.lunch.start, element.lunch.stop)}  />
                      <Slider 
                              disabled={!element.lunch.disabled}
                              step={7.69}
                              min={0}
                              max={100}
                              orientation="vertical"
                              defaultValue={[this.state.default[index].lunch.start, this.state.default[index].lunch.stop]}
                              aria-labelledby="vertical-slider"
                              marks={marksJour}
                              onChangeCommitted={(e,val) => this.handleLunchTime(e,val,index,element.lunch.disabled)}
                          />
                          </div><div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',height:'45%',margin:'5%'}}>
                  <IOSSwitch checked={element.dinner.disabled} onClick={() => this.onSwitchChange(element.id,"dinnerTime",element.dinner.disabled, element.dinner.start, element.dinner.stop)}  />
                      <Slider 
                              disabled={!element.dinner.disabled}
                              step={7.69}
                              color="secondary"
                              orientation="vertical"
                              defaultValue={[this.state.default[index].dinner.start, this.state.default[index].dinner.stop]}
                              aria-labelledby="vertical-slider"
                              marks={marksSoir}
                              onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,index,element.dinner.disabled)}
                          />
                          </div>
                  </div>
                  </Paper> 

                ))}
                
                
            </Paper>}
        </div>
        )
    }
}

export default Calendrier

/**<div style={{ borderRadius:'5px 0px 0px 5px',color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'40px',background:'#343333'}}>Lundi</div>
                    <div style={{borderRadius:'5px',height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}}>
                    <Slider 
                        style={{margin:'10px',fontSize:'12px'}}
                                step={7.69}
                                min={0}
                                max={100}
                                orientation="vertical"
                                defaultValue={[38.45,69.21]}
                                aria-labelledby="vertical-slider"
                                marks={marksJour}
                                onChangeCommitted={(e,val) => this.handleLunchTime(e,val,0)}
                            />
                        <Slider 
                                style={{margin:'10px'}}
                                step={7.69}
                                color="secondary"
                                orientation="vertical"
                                defaultValue={[15.38,76.66]}
                                aria-labelledby="vertical-slider"
                                marks={marksSoir}
                                onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,0)}
                            />
                            </div>
                </Paper>
                <Paper style={{display:'flex',flexDirection:'column',alignItems:'center',width:'15%',marginTop:'10px',background:'#f2f2f2',marginBottom:'10px',height:'600px'}}>
                    <div style={{color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'40px',background:'#343333'}}>Mardi</div>
                    <div style={{borderRadius:'5px 5px 0px 0px',height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <Slider 
                        style={{margin:'10px'}}
                                step={7.69}
                                min={0}
                                max={100}
                                orientation="vertical"
                                defaultValue={[38.45,69.21]}
                                aria-labelledby="vertical-slider"
                                marks={marksJour}
                                onChangeCommitted={(e,val) => this.handleLunchTime(e,val,1)}
                            />
                        <Slider 
                                style={{margin:'10px'}}
                                step={7.69}
                                color="secondary"
                                orientation="vertical"
                                defaultValue={[15.38,76.66]}
                                aria-labelledby="vertical-slider"
                                marks={marksSoir}
                                onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,1)}
                            />
                    </div>
                </Paper>
                <Paper style={{display:'flex',flexDirection:'column',alignItems:'center',width:'15%',marginTop:'10px',background:'#f2f2f2',marginBottom:'10px',height:'600px'}}>
                    <div style={{color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'40px',background:'#343333'}}>Mercredi</div>
                    <div style={{borderRadius:'5px 5px 0px 0px',height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}}>
                    <Slider 
                        style={{margin:'10px'}}
                                step={7.69}
                                min={0}
                                max={100}
                                orientation="vertical"
                                defaultValue={[38.45,69.21]}
                                aria-labelledby="vertical-slider"
                                marks={marksJour}
                                onChangeCommitted={(e,val) => this.handleLunchTime(e,val,2)}
                            />
                        <Slider 
                                style={{margin:'10px'}}
                                step={7.69}
                                color="secondary"
                                orientation="vertical"
                                defaultValue={[15.38,76.66]}
                                aria-labelledby="vertical-slider"
                                marks={marksSoir}
                                onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,2)}
                            />
                    </div>
                </Paper>
                <Paper style={{display:'flex',flexDirection:'column',alignItems:'center',width:'15%',marginTop:'10px',background:'#f2f2f2',marginBottom:'10px',height:'600px'}}>
                    <div style={{color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'40px',background:'#343333'}}>Jeudi</div>
                    <div style={{borderRadius:'5px 5px 0px 0px',height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}}>
                    <Slider 
                        style={{margin:'10px'}}
                                step={7.69}
                                min={0}
                                max={100}
                                orientation="vertical"
                                defaultValue={[38.45,69.21]}
                                aria-labelledby="vertical-slider"
                                marks={marksJour}
                                onChangeCommitted={(e,val) => this.handleLunchTime(e,val,3)}
                            />
                        <Slider 
                                style={{margin:'10px'}}
                                step={7.69}
                                color="secondary"
                                orientation="vertical"
                                defaultValue={[15.38,76.66]}
                                aria-labelledby="vertical-slider"
                                marks={marksSoir}
                                onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,3)}
                            />
                    </div>
                </Paper>
                <Paper style={{display:'flex',flexDirection:'column',alignItems:'center',width:'15%',marginTop:'10px',background:'#f2f2f2',marginBottom:'10px',height:'600px'}}>
                    <div style={{color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'40px',background:'#343333'}}>Vendredi</div>
                    <div style={{borderRadius:'5px 5px 0px 0px',height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}}>
                    <Slider 
                        style={{margin:'10px'}}
                                step={7.69}
                                min={0}
                                max={100}
                                orientation="vertical"
                                defaultValue={[38.45,69.21]}
                                aria-labelledby="vertical-slider"
                                marks={marksJour}
                                onChangeCommitted={(e,val) => this.handleLunchTime(e,val,4)}
                            />
                        <Slider 
                                style={{margin:'10px'}}
                                step={7.69}
                                color="secondary"
                                orientation="vertical"
                                defaultValue={[15.38,76.66]}
                                aria-labelledby="vertical-slider"
                                marks={marksSoir}
                                onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,4)}
                            />
                    </div>
                </Paper>
                <Paper style={{display:'flex',flexDirection:'column',alignItems:'center',width:'15%',marginTop:'10px',background:'#f2f2f2',marginBottom:'10px',height:'600px'}}>
                    <div style={{color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'40px',background:'#343333'}}>Samedi</div>
                    <div style={{borderRadius:'5px 5px 0px 0px',height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}}>
                    <Slider 
                        style={{margin:'10px'}}
                                step={7.69}
                                min={0}
                                max={100}
                                orientation="vertical"
                                defaultValue={[38.45,69.21]}
                                aria-labelledby="vertical-slider"
                                marks={marksJour}
                                onChangeCommitted={(e,val) => this.handleLunchTime(e,val,5)}
                            />
                        <Slider 
                                style={{margin:'10px'}}
                                step={7.69}
                                color="secondary"
                                orientation="vertical"
                                defaultValue={[15.38,76.66]}
                                aria-labelledby="vertical-slider"
                                marks={marksSoir}
                                onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,5)}
                            />
                    </div>
                </Paper>
                <Paper style={{display:'flex',flexDirection:'column',alignItems:'center',width:'15%',marginTop:'10px',background:'#f2f2f2',marginRight:'10px',marginBottom:'10px',height:'600px'}}>
                    <div style={{color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',borderRadius:'0px 5px 5px 0px',width:'100%',height:'40px',background:'#343333'}}>Dimanche</div>
                    <div style={{borderRadius:'5px 5px 0px 0px',height:'100%',width:'100%',background:'white',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}}>
                    <Slider 
                        style={{margin:'10px'}}
                                step={7.69}
                                min={0}
                                max={100}
                                orientation="vertical"
                                defaultValue={[38.45,69.21]}
                                aria-labelledby="vertical-slider"
                                marks={marksJour}
                                onChangeCommitted={(e,val) => this.handleLunchTime(e,val,6)}
                            />
                        <Slider 
                                style={{margin:'10px'}}
                                step={7.69}
                                color="secondary"
                                orientation="vertical"
                                defaultValue={[15.38,76.66]}
                                aria-labelledby="vertical-slider"
                                marks={marksSoir}
                                onChangeCommitted={(e,val) => this.handleDinnerTime(e,val,6)}
                            />
                    </div>
                </Paper>**/
