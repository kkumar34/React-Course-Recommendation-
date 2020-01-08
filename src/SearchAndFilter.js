class SearchAndFilter {
  searchAndFilter(courses, searchList, subject, minimumCredits, maximumCredits, buttonValue) {
    if(searchList.length !== 0) {
      if(buttonValue === 1){
        courses = this.method1(searchList, courses);
      }
      else{
        courses = this.method2(searchList, courses);
      }
    }

    if(subject !== 'All') {
      let coursesAfterSubject = [];

      for(const course of Object.values(courses)) {
        if(course.subject === subject)
          coursesAfterSubject.push(course)
      }
      courses = coursesAfterSubject;
    }

    if(minimumCredits !== '') {
      let coursesAfterMinimumCredits = [];

      for(const course of Object.values(courses)) {
        if(course.credits >= parseInt(minimumCredits))
          coursesAfterMinimumCredits.push(course);
      }
      courses = coursesAfterMinimumCredits;
    }

    if(maximumCredits !== '') {
      let coursesAfterMaximumCredits = [];

      for(const course of Object.values(courses)) {
        if(course.credits <= parseInt(maximumCredits))
          coursesAfterMaximumCredits.push(course);
      }
      courses = coursesAfterMaximumCredits;
    }

    return courses;
  }

  method1(searchList, courses){
    let coursesAfterSearch = [];
    var counter = 0;
    for(const course of Object.values(courses)) {
      counter = 0;
      for(const tag of searchList){
        for(const keyword of course.keywords) {
          if(keyword.includes(tag)) {
            counter = 1;
          }
        }
        if(counter === 0){
          counter = 0;
          break;
        }
      }
      if(counter === 1){
        coursesAfterSearch.push(course);
      }
    }
    return coursesAfterSearch
  }

  method2(searchList, courses){
    let coursesAfterSearch = [];
    var counter = 0;
    for(const course of Object.values(courses)) {
      counter = 0;
      for(const tag of searchList){
        for(const keyword of course.keywords) {
          if(keyword.includes(tag)) {
            counter = 1;
          }
        }
      }
      if(counter === 1){
        coursesAfterSearch.push(course);
      }
    }
    return coursesAfterSearch
  }
}

export default SearchAndFilter;