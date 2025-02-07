import React, { useState } from "react";

import "../../App.css";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";

// form and modal modules
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal,
} from "antd";
import "antd/dist/antd.css";
import { QuestionCircleOutlined } from "@ant-design/icons";

class UserRegistration extends React.Component {
  render() {
    // Register Form
    const { Option } = Select;
    const AutoCompleteOption = AutoComplete.Option;
    const residences = [
      {
        value: "Sri Lanka",
        label: "Sri Lanka",
        children: [
          {
            value: "Colombo",
            label: "Colombo",
            children: [
              {
                value: "Maharagama",
                label: "Maharagama",
              },

              {
                value: "Maradana",
                label: "Maradana",
              },
              {
                value: "Kottawa",
                label: "Kottawa",
              },
              {
                value: "Homagama",
                label: "Homagama",
              },
              {
                value: "Piliyandala",
                label: "Piliyandala",
              },
            ],
          },
          {
            value: "Ratnapura",
            label: "Ratnapura",
            children: [
              {
                value: "Ratnapura",
                label: "Ratnapura",
              },

              {
                value: "Palmadulla",
                label: "Palmadulla",
              },
              {
                value: "Kahawatta",
                label: "Kahawatta",
              },
              {
                value: "Embilipitiya",
                label: "Embilipitiya",
              },
            ],
          },
        ],
      },
      {
        value: "India",
        label: "India",
        children: [
          {
            value: "Mumbai",
            label: "Mumbai",
            children: [
              {
                value: "Sanker",
                label: "Sanker",
              },
            ],
          },
        ],
      },
    ];
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
      const [form] = Form.useForm();

      const onFinish = (values) => {
        console.log("Received values of form: ", values);
      };

      const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <Option value="94">+94</Option>
            <Option value="91">+91</Option>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
            <Option value="43">+43</Option>
          </Select>
        </Form.Item>
      );
      const [autoCompleteResult, setAutoCompleteResult] = useState([]);

      const onWebsiteChange = (value) => {
        if (!value) {
          setAutoCompleteResult([]);
        } else {
          setAutoCompleteResult(
            [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
          );
        }
      };

      const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
      }));
      return (
        <Modal
          visible={visible}
          title="Register"
          okText="Register"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["Sri Lanka", "Colombo", "Maharagama"],
              prefix: "94",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="FirstName"
              label={
                <span>
                  First Name
                  <Tooltip title="What is your first name?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="LastName"
              label={
                <span>
                  Last Name
                  <Tooltip title="What is your last name?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="residence"
              label="Habitual Residence"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Please select your habitual residence!",
                },
              ]}
            >
              <Cascader options={residences} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item label="Room Number">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input the Room number you got!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("Should accept agreement"),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      );
    };
    //popup and form code

    const CollectionsPage = () => {
      const [visible, setVisible] = useState(false);

      //With this, we will get all field values.
      const onCreate = (values) => {
        console.log("Received values of form: ", values);
        setVisible(false);
      };

      return (
        <div>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            Register
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </div>
      );
    };
    return (
      <div className="MainDiv">
        <div class="jumbotron text-center">
          <h3>User Registration</h3>
        </div>

        <div className="container">
          <CollectionsPage />
        </div>
      </div>
    );
  }
}
export default UserRegistration;
