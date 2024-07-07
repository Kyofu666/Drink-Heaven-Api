import { Form, redirect, useNavigation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
    // get the form data
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    //post the form data to the server
    try {
        const response = await axios.post(newsletterUrl, data)
        toast.success(response.data.msg)
        // redirect the user after completion of the tasks 
        return redirect('/')
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg)
        return error;
    }

}



const Newsletter = () => {

    const navigate = useNavigation()
    const isSubmitting = navigate.state === 'submitting'
    return (
        <Form method='POST' className="form">
            <h4 style={{ marginBottom: '2rem', textAlign: 'center' }}>
                our Newsletter
            </h4>

            <div className="form-row">
                <label htmlFor="name" className="form-label">
                    name
                </label>
                <input type="text" className="form-input" name="name" id="name" required />
            </div>

            <div className="form-row">
                <label htmlFor="lastName" className="form-label">
                    last name
                </label>
                <input type="text" className="form-input" name="lastName" id="lastName" required />
            </div>

            <div className="form-row">
                <label htmlFor="email" className="form-label">
                    email
                </label>
                <input type="text" className="form-input" name="email" id="email" defaultValue='test@test.com' />
            </div>
            <button type="submit" disabled className="btn btn-block" style={{ marginTop: '0.5rem' }} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting' : 'submit'}
            </button>
        </Form>

    )
}

export default Newsletter
