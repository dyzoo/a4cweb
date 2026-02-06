export default function MissionStatement() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">A4C Strategic Direction</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-orange-600">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To empower and uplift children in difficult environments by providing education, healthcare, and social support. We strive to offer essential resources, advocacy, and a strong support network to help every child achieve their dreams and build a brighter future.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-900">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To create a Tanzania where every child, regardless of their circumstances, has the opportunity to grow, learn, and thrive in a safe and supportive environment.
            </p>
          </div>

          {/* Objectives Card */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-orange-600">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900">Our Objectives</h3>
            </div>
            <ul className="text-gray-700 space-y-3">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">•</span>
                <span>Promote access to quality education for disadvantaged children</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">•</span>
                <span>Advocate for improved healthcare services for children</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">•</span>
                <span>Raise awareness on the importance of social and emotional well-being</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">•</span>
                <span>Empower the community on supporting children's development</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}