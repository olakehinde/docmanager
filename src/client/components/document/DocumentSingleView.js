import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';

class DocumentSingleView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { document } = this.props;
    if (!document) {
      // do nothing
    }
    const length = Object.getOwnPropertyNames(document).length;
    if(length === 0) {
      this.context.router.push('/documents');
    }

    return (
      <div className="row">
        <div className="col m8 offset-m2">
          <h6>
            <span className="right">Access: 
              <span className="blue-color"> {document.access}</span>
            </span>
          </h6>
          <h5 className="center-align">{document.title}</h5>
          <TinyMCE
            name="content"
            id="content"
            apiKey="6kvdpw49pmj4tn5h8ylf8ms3x8k2t4i1hxx7cb7cqqnes7ds"
            config={{
              height: 500,
              width: 825,
              plugins: 'link image code',
              toolbar: `undo redo | 
                bold italic | alignleft aligncenter alignright | code`
            }}
            content={document.content}
          />
          <hr />
          <p>
            <span>
              Created by:
              <span className="blue-color"> {document.User.name}</span>
            </span>
            <br />
            <span>
              Created at:
              <span
                className="blue-color"> {document.createdAt.substring(0, 10)}
              </span>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

DocumentSingleView.propTypes = {
  document: PropTypes.object.isRequired
};

DocumentSingleView.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const documentId = ownProps.params.id;
  let document = {};
  state.documents.data.forEach(doc => {
    const curDocId = String(doc.id);
    if (curDocId === documentId) {
      document = doc;
    }
  });
  return { document };
  
}

export default connect(mapStateToProps)(DocumentSingleView);