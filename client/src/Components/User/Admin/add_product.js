import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateOptionFields } from '../../utils/Form/formActions';

import {connect} from 'react-redux'
import {getCharacters, getPublishers, addProduct } from '../../../actions/products_actions'

class AddProduct extends Component {

    state={
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Product title',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter title'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config:{
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter your description'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config:{
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter your price'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            character: {
                element: 'select',
                value: '',
                config:{
                    label: 'Product character',
                    name: 'character_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config:{
                    label: 'Available, in stock',
                    name: 'available_input',
                    options:[
                        {key:true,value:'Yes'},
                        {key:false,value:'No'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config:{
                    label: 'Shipping',
                    name: 'shipping_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            publisher: {
                element: 'select',
                value: '',
                config:{
                    label: 'Publisher',
                    name: 'publisher_input',
                    options:[]
                    
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            
            
            publish: {
                element: 'select',
                value: '',
                config:{
                    label: 'Publish',
                    name: 'publish_input',
                    options:[
                        {key:true,value:'Public'},
                        {key:false,value:'Hidden'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
        }
    }

    updateFields = (newFormData) => {
        this.setState({
            formdata: newFormData
        })
    }


    
    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'products');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    
    
    


    submitForm= (event) =>{
        event.preventDefault();
        
        var dataToSubmit = generateData(this.state.formdata,'register');
        var formIsValid = isFormValid(this.state.formdata,'register')

        if(formIsValid){
            console.log(dataToSubmit);
            
        } else {
            this.setState({
                formError: true
            })
        }
    }
    

    componentDidMount(){
        const formdata =  this.state.formdata;

        this.props.dispatch(getCharacters()).then( response => {
            const newFormData = populateOptionFields(formdata,this.props.products.characters, 'character');            
            this.updateFields(newFormData)
            console.log(newFormData);
            
        })

        this.props.dispatch(getPublishers()).then( response => {
            const newFormData = populateOptionFields(formdata,this.props.products.publishers, 'character');            
            this.updateFields(newFormData)
            console.log(newFormData);
            
        })
    }


    render() {
        return (
            <UserLayout>
               <div>
                   <h1>Add product</h1>

                   <form onSubmit={(event)=> this.submitForm(event)}>
                   
                   <FormField
                       id={'name'}
                       formdata={this.state.formdata.name}
                       change={(element)=> this.updateForm(element)}
                     />


                    <FormField
                       id={'description'}
                       formdata={this.state.formdata.description}
                       change={(element)=> this.updateForm(element)}
                     />

                     <FormField
                       id={'price'}
                       formdata={this.state.formdata.price}
                       change={(element)=> this.updateForm(element)}
                     />

                     <div className="form_devider"></div>

                     <FormField
                       id={'character'}
                       formdata={this.state.formdata.character}
                       change={(element)=> this.updateForm(element)}
                     />

                    <FormField
                       id={'available'}
                       formdata={this.state.formdata.available}
                       change={(element)=> this.updateForm(element)}
                     />

                    <FormField
                       id={'shipping'}
                       formdata={this.state.formdata.shipping}
                       change={(element)=> this.updateForm(element)}
                     />


                    <div className="form_devider"></div>

                    <FormField
                       id={'publisher'}
                       formdata={this.state.formdata.shipping}
                       change={(element)=> this.updateForm(element)}
                     />

                       <FormField
                       id={'publisher'}
                       formdata={this.state.formdata.publisher}
                       change={(element)=> this.updateForm(element)}
                     /> 

                    <div className="form_devider"></div>

                    <FormField
                       id={'publish'}
                       formdata={this.state.formdata.publish}
                       change={(element)=> this.updateForm(element)}
                     /> 

                    {this.state.formSuccess ?
                        <div className="form_success">
                                Success
                            </div>
                        :null}

                        {this.state.formError ?
                            <div className="error_label">
                                Please check your data
                                        </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Add product
                        </button>

                   </form>
               </div>


            </UserLayout>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProduct);