import React, { useState } from 'react'
import languages from "../data/languages";
import api from "../services/api";

const Form = () => {
  const [ loading, setLoading ] = useState(false)
  const [ language, setLanguage ] = useState('EN')
  const [ text, setText ] = useState('')

  const [ error, setError ] = useState(null)

  async function submit(e) {
    e.preventDefault();

    setLoading(true)
    setError(null)

    const params = {
      target_lang: language,
      text
    }

    try {
      const res = await api.get(`/translate`, { params })
    } catch (e) {
      const { message = 'Something went wrong. Try again or contact our support.' } = e.response.data || {};
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-5">
      <form onSubmit={ submit }>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="target_lang"
                       className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  id="target_lang"
                  name="target_lang"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={ language }
                  onChange={ e => setLanguage(e.target.value) }
                >
                  {
                    languages.map((item, index) => (
                      <option key={ index }
                              value={ item.source_lang }>
                        { item.title }
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className="col-span-6">
                <label htmlFor="text"
                       className="block text-sm font-medium text-gray-700">
                  English text
                </label>
                <textarea
                  name="text"
                  id="text"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={ text }
                  onChange={ e => setText(e.target.value) }
                  required
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={ loading }
            >
              { loading ? 'Transling...' : 'Translate' }
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Form
