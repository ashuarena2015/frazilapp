import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class AddChecklists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: '',
      // inputFieldCounter: 0
      tags: [],
      suggestions: [],
      projectSelected: '',
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  componentDidMount() {
    this.props.getProjects();
  }

  componentDidUpdate(prevProps) {
    prevProps.frazilProjects !== this.props.frazilProjects && this.setState({
      projects: this.props.frazilProjects
    })
  }

  checklistInputFieldsAdd() {
    const { tags, projectSelected } = this.state;
      const payload = {
        tags,
        projectSelected
      }
      console.log('payload', payload);
  }

  // removeChecklistInput(id) {
  //   console.log(id);
  // }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
     tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
      this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
      const tags = [...this.state.tags];
      const newTags = tags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      this.setState({ tags: newTags });
  }

  onChange(e) {
    const { target: { value, name } = { } } = e;
    console.log('value', value);
		this.setState({
			[name]: value
		});
  }

  render(){
    const { projects, tags, suggestions, projectSelected } = this.state;
    const allProjects = [];
    projects && projects.map((project) => {
      return allProjects.push(<option value={project.id}>{project.name}</option>);
    })
    // let fields = [];
    // for(var i = 0; i < inputFieldCounter; i++) {
    //   fields.push(<div className="checklists"><input type="text" className="form-control" name={`checklist_${i}`} id={`checklist_${i}`} /><button className="btn btn-ghost-o" onClick={() => this.removeChecklistInput(`checklist_${i}`)}>X</button></div>);
    // }

    console.log('projectSelected', projectSelected);

    return(
      <React.Fragment>
        <div className="container m-t-50">
		    	<div className="panel panel-default">
		    		<div className="panel-body">
              <h3>Add Checklists</h3>
              <div className="form-group m-b-rg">
                <label>Select Project</label>
                <select name="projectSelected" className="form-control" style={{ height: '40px' }} onChange={(e) => this.onChange(e)}>
                  <option value="">Select project</option>
                  { allProjects }
                </select>
              </div>
              <div className="form-group m-b-rg">
                <label>Enter Checklists</label>
                <div id="all_checklists" className="checklist_input_section">
                  {/* {fields} */}
                  <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                  />
                </div>
              </div>
              <div className="form-group m-b-rg">
                <button type="button" className="btn btn-purple-o" onClick={() => this.checklistInputFieldsAdd()}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

}