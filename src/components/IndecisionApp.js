import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';
import Modal from 'react-modal';

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    closeModal = () => {
        this.setState (() => ({
            selectedOption: undefined
        }));
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length) ;
        const option = this.state.options[randomNum];
        this.setState (() => ({ 
            selectedOption: option
        }) );
    }
    handleDeleteOptions = () => {
        this.setState (() => ({ options: [] }));
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState ((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid option to add';
        }else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState ((prevState) => ({ options: prevState.options.concat([option]) }));
    }
    componentWillMount() {
        Modal.setAppElement('body');
     }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState (() => ({ options }));
            }
        }catch (e) {

        }
    }
    componentDidUpdate(prevProps ,prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    render(){
        const subtitle = 'An app for the Confusers?';

        return (
            <div>
            <Header subtitle={subtitle}/>
            <Action 
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
            />
            <Options 
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions} 
                handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption}/>
            <OptionModal 
                selectedOption={this.state.selectedOption}
                closeModal={this.closeModal}
            />
        </div>
        );
    }
}

export default IndecisionApp;