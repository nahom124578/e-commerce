import { useRef, useState } from "react";

function Feedback() {
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef(null);

  const PopupOpen = () => {
    setShowPopup(true);
  };

  const PopupClose = () => {
    setShowPopup(false);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!formRef.current) {
      console.error("Form reference is not set");
      return;
    }

    const formElements = formRef.current.elements;
    const feedbackData = {
      aspect: "General",
      satisfaction_levels: {
        effectiveness: formElements['effectiveness'].value,
        communication: formElements['communication'].value,
        creativity: formElements['creativity'].value,
        timeliness: formElements['timeliness'].value,
        overall: formElements['overall'].value,
        product: formElements['product'].value,
        supply: formElements['supply'].value,
      },
      improvement_suggestions: formElements['improvement'].value
    };

    try {
      const response = await fetch('http://localhost:3001/submit-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      });
      if (response.ok) {
        setShowThankYouMessage(true);
        setShowPopup(true);
      } else {
        console.error('Error submitting feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="max-w-3xl w-full shadow-lg p-8 bg-white rounded-lg">
          <div className="mb-8 border-b-2 border-gray-400 pb-4 text-center">
            <h1 className="font-bold text-4xl mb-2">Feedback Form</h1>
            <h2 className="text-xl mb-4">Take a moment to fill the form</h2>
          </div>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div id="form">
              <div id="online-marketing-feedback">
                <table className="w-full border-collapse text-lg mb-8">
                  <thead>
                    <tr>
                      <th rowSpan="1" className="border px-4 py-2 text-center bg-gray-200">
                        Aspect
                      </th>
                      <th colSpan="6" className="border px-4 py-2 text-center bg-gray-200">Satisfaction Level</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th className="border px-4 py-2 text-center bg-gray-200">Very satisfied</th>
                      <th className="border px-4 py-2 text-center bg-gray-200">Satisfied</th>
                      <th className="border px-4 py-2 text-center bg-gray-200">Neutral</th>
                      <th className="border px-4 py-2 text-center bg-gray-200">Unsatisfied</th>
                      <th className="border px-4 py-2 text-center bg-gray-200">Very unsatisfied</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="even:bg-gray-100">
                      <td className="border px-4 py-2 text-center">Campaign Effectiveness</td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="effectiveness" value="Very satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="effectiveness" value="Satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="effectiveness" value="Neutral" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="effectiveness" value="Unsatisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="effectiveness" value="Very unsatisfied" />
                      </td>
                    </tr>
                    <tr className="even:bg-gray-100">
                      <td className="border px-4 py-2 text-center">Communication</td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="communication" value="Very satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="communication" value="Satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="communication" value="Neutral" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="communication" value="Unsatisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="communication" value="Very unsatisfied" />
                      </td>
                    </tr>
                    <tr className="even:bg-gray-100">
                      <td className="border px-4 py-2 text-center">Creativity</td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="creativity" value="Very satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="creativity" value="Satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="creativity" value="Neutral" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="creativity" value="Unsatisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="creativity" value="Very unsatisfied" />
                      </td>
                    </tr>
                    <tr className="even:bg-gray-100">
                      <td className="border px-4 py-2 text-center">Timeliness</td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="timeliness" value="Very satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="timeliness" value="Satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="timeliness" value="Neutral" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="timeliness" value="Unsatisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="timeliness" value="Very unsatisfied" />
                      </td>
                    </tr>
                    <tr className="even:bg-gray-100">
                      <td className="border px-4 py-2 text-center">Overall Satisfaction</td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="overall" value="Very satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="overall" value="Satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="overall" value="Neutral" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="overall" value="Unsatisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="overall" value="Very unsatisfied" />
                      </td>
                    </tr>
                    <tr className="even:bg-gray-100">
                      <td className="border px-4 py-2 text-center">Our Product</td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="product" value="Very satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="product" value="Satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="product" value="Neutral" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="product" value="Unsatisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="product" value="Very unsatisfied" />
                      </td>
                    </tr>
                    <tr className="even:bg-gray-100">
                      <td className="border px-4 py-2 text-center">Our Supply</td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="supply" value="Very satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="supply" value="Satisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="supply" value="Neutral" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="supply" value="Unsatisfied" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input type="radio" name="supply" value="Very unsatisfied" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-xl mb-4">How can we improve our service?</h2>
                <textarea
                  className="w-full h-40 p-4 border-2 rounded-lg bg-gray-200 mb-4"
                  name="improvement"
                  placeholder="Type here..."
                  rows="4"
                  required
                ></textarea>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Response recorded</h1>
            <p className="mb-4">Thank you for your feedback!</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" type="button" onClick={PopupClose}>
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Feedback;
