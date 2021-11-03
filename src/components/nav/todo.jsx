import { date } from "check-types"
import React from "react"

export default class nav extends React.Component{
    state={
        value:"",
        list:[],
        i:-1,
        value2:""
    }
    handlechange=(e)=>{
        this.setState({
            value:e.target.value
        })
    }
    
    handletime=(e)=>{
        this.setState({
            value2:e.target.value
        })
    }

    handlesubmit=(e)=>{
        e.preventDefault()
        let val1= this.state.value
        let val2= this.state.value2
        let obj={val1,val2}
        let newlist=this.state.list
        newlist.push(obj)
        this.setState({
            list:newlist,
            value:"",
            value2:""
        })
        setInterval(() => {
            this.filterdata()
        }, 1000);
         
    }

    shiftUp=(i)=>{
        if(i==0){
            alert('already on top')
        }
        else{
            let aray=this.state.list
            let temp=aray[i-1]
            aray[i-1]=aray[i]
            aray[i]=temp
            this.setState({
                list:aray
            })
        }
    }
    shiftDown=(i)=>{
        let aray1=this.state.list

        if(i==aray1.length-1){
            alert('already on bottom')
        }
        else{
            let temp2=aray1[i+1]
            aray1[i+1]=aray1[i]
            aray1[i]=temp2
            this.setState({
                list:aray1
            })
        }
    }
    handledel=(i)=>{
        let aray2=this.state.list
        aray2.splice(i,1)
        this.setState({
            list:aray2
        })
    }
    edit=(i)=>{
        let edit=this.state.list[i].val1
        let edit2=this.state.list[i].val2
        // console.log(edit[i])
        
        this.setState({
            value:edit,
            value2:edit2,
            i:i
        })
    }
    
    update=()=>{
        let update=this.state.list
        let newindex=this.state.i
        update[newindex].val1=this.state.value
        update[newindex].val2=this.state.value2
        this.setState({
            list:update,
            value:"",
            value2:""
        })
    }

    filterdata=()=>{
  if(this.state.list.length>0)
  {

    let date=new Date()
    let Time=date.toLocaleTimeString()
    let h=Time.slice(0,5) 
    let sp=this.state.list    
    this.state.list.map((e,i)=>{
        if(e.val2==h)
        {
         alert("time has matched")
        sp.splice(i,1)
        this.setState({
            list:sp
        })
        }

       
        })
    }
    }
    

    render(){
        // console.log(this.state.value2,"val")
        // console.log(this.state.list,"value")
        let date = new Date()

        let data= this.state.list.map((elm,i)=>{
            return(
                <>
                <tr className="tr" key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{elm.val1}</td>
                    <td>{date.toLocaleTimeString()}</td>
                    <td>{elm.val2}</td>
                    <td className="">
                        <button className="btn btnw btn-primary" onClick={()=>{this.edit(i)}}>Edit</button>
                        <button className="btn btnw btn-danger ml-2" onClick={()=>{this.handledel(i)}}>Del</button>
                        <button className="btn btnw btn-light ml-2" onClick={()=>{this.shiftUp(i)}}>Up</button>
                        <button className="btn btnw btn-dark ml-2" onClick={()=>{this.shiftDown(i)}}>Down</button>
                    </td>
                </tr>
                {/* <tr className='d-flex justify-content-center align-items-center border btnTr'>
                        <button className="btn btn-primary" onClick={()=>{this.edit(i)}}>Edit</button>
                        <button className="btn btn-danger ml-2" onClick={()=>{this.handledel(i)}}>Del</button>
                        <button className="btn btn-light ml-2" onClick={()=>{this.shiftUp(i)}}>Up</button>
                        <button className="btn btn-dark ml-2" onClick={()=>{this.shiftDown(i)}}>Down</button>
                </tr> */}
                </>
            )
        })

        return (<div className = "main">
            <form onSubmit={this.handlesubmit} className="div2">
            <input type="text" value={this.state.value} name="inp" id="inp1" placeholder="Add Note" onChange={this.handlechange}/>
            <input type="time" value={this.state.value2} name="inp2" id="inp1" placeholder="set time" onChange={this.handletime}/>
            <button type="button" className="btn btn-light ml-3 mt-2" onClick={()=>{this.update()}}>Update</button>
            </form>
            <table className="table">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Routine</th>
      <th scope="col">Time</th>
      <th scope="col">Alarm</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    {data}
  </tbody>
</table>
        </div>)
    }
}