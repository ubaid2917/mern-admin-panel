import React from "react";

const DeleteModel = ({ deleteId, handleDelete }) => {
  return (
    <div>
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-confirm modal-dialog-centered">
          <div className="modal-content text-center">
            <div className="modal-header flex-column border-0">
              <div className="icon-box mx-auto">
                <i className="material-icons">&#xE5CD;</i>
              </div>
              <h4 className="modal-title w-100">Are you sure?</h4>
              
            </div>
            <div className="modal-body">
              <p>
                Do you really want to delete this record? This process cannot be
                undone.
              </p>
            </div>
            <div className="modal-footer justify-content-center border-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles inline */}
      <style jsx>{`
        .modal-confirm {
          color: #636363;
          width: 400px;
        }
        .modal-confirm .modal-content {
          padding: 20px;
          border-radius: 5px;
          border: none;
          font-size: 14px;
        }
        .modal-confirm .modal-header {
          position: relative;
        }
        .modal-confirm h4 {
          font-size: 26px;
          margin: 30px 0 -10px;
        }
        .modal-confirm .icon-box {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border-radius: 50%;
          z-index: 9;
          text-align: center;
          border: 3px solid #f15e5e;
        }
        .modal-confirm .icon-box i {
          color: #f15e5e;
          font-size: 46px;
          display: inline-block;
          margin-top: 13px;
        }
        .modal-confirm .btn {
          color: #fff;
          border-radius: 4px;
          transition: all 0.4s;
          min-width: 120px;
          border: none;
          min-height: 40px;
          margin: 0 5px;
        }
        .modal-confirm .btn-danger {
          background: #f15e5e;
        }
        .modal-confirm .btn-danger:hover {
          background: #ee3535;
        }
        .modal-confirm .btn-secondary {
          background: #c1c1c1;
        }
        .modal-confirm .btn-secondary:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default DeleteModel;
