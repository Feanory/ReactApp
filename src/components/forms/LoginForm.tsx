import * as React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

interface LoginFormProps {
  submit(data: { apiKey: string }): void;
}

interface LoginFormState {
  data: { apiKey: string };  
  errors: { apiKey: string };
  loading: boolean;
} 

export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);

    this.state = {
        data: {
            apiKey: ''
        },
        errors: {
            apiKey: ''
        },
        loading: false
    };
  }

  public onChange = (e: any) => this.setState({ 
    data: { ...this.state.data, [e.target.name]: e.target.value } 
  });

  public onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (!errors.apiKey) {
      this.props.submit(this.state.data);
    }
  };

  public validate = (data: any) => {
    const errors = {
      apiKey: ''
    };
    if (!data.apiKey) {
      errors.apiKey = 'Can`t be blank';
    }
    return errors;
  };

  public render() {
    const { data, errors } = this.state;
    return (
      <Form id="formApi" onSubmit={() => this.onSubmit()}>
        <Form.Field>
          <Form.Input 
            label='ApiUrl' 
            placeholder='Enter your apiKey...'
            type="text" 
            id="apiKey" 
            name="apiKey"
            value={data.apiKey}
            onChange={e => this.onChange(e)} />
          {
            errors.apiKey &&
            <Message negative>{errors.apiKey}</Message>
          }
        </Form.Field>
        <Button color='teal'>Login</Button>
        <Message info header='Example apiKey' content="17e65ecee926a53f4ad4ddd26a472d56" />
      </Form>
    )
  }
}
//
// LoginForm.propTypes = {
//   submit: PropTypes.func.isRequired
// };