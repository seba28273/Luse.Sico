import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJob } from 'app/shared/model/job.model';
import { getEntities as getJobs } from 'app/entities/job/job.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './job-history.reducer';
import { IJobHistory } from 'app/shared/model/job-history.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJobHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IJobHistoryUpdateState {
  isNew: boolean;
  jobId: string;
  departmentId: string;
  employeeId: string;
}

export class JobHistoryUpdate extends React.Component<IJobHistoryUpdateProps, IJobHistoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      jobId: '0',
      departmentId: '0',
      employeeId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getJobs();
    this.props.getDepartments();
    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { jobHistoryEntity } = this.props;
      const entity = {
        ...jobHistoryEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/job-history');
  };

  render() {
    const { jobHistoryEntity, jobs, departments, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sicoApp.jobHistory.home.createOrEditLabel">
              <Translate contentKey="sicoApp.jobHistory.home.createOrEditLabel">Create or edit a JobHistory</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : jobHistoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="job-history-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    <Translate contentKey="sicoApp.jobHistory.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="job-history-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.jobHistoryEntity.startDate)}
                  />

                  <Label id="endDateLabel" for="endDate">
                    <Translate contentKey="sicoApp.jobHistory.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="job-history-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.jobHistoryEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="languageLabel">
                    <Translate contentKey="sicoApp.jobHistory.language">Language</Translate>
                  </Label>
                  <AvInput
                    id="job-history-language"
                    type="select"
                    className="form-control"
                    name="language"
                    value={(!isNew && jobHistoryEntity.language) || 'FRENCH'}
                  >
                    <option value="FRENCH">
                      <Translate contentKey="sicoApp.Language.FRENCH" />
                    </option>
                    <option value="ENGLISH">
                      <Translate contentKey="sicoApp.Language.ENGLISH" />
                    </option>
                    <option value="SPANISH">
                      <Translate contentKey="sicoApp.Language.SPANISH" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="job.id">
                    <Translate contentKey="sicoApp.jobHistory.job">Job</Translate>
                  </Label>
                  <AvInput id="job-history-job" type="select" className="form-control" name="job.id">
                    <option value="" key="0" />
                    {jobs
                      ? jobs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.jobTitle}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="department.id">
                    <Translate contentKey="sicoApp.jobHistory.department">Department</Translate>
                  </Label>
                  <AvInput id="job-history-department" type="select" className="form-control" name="department.id">
                    <option value="" key="0" />
                    {departments
                      ? departments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.departmentName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="employee.id">
                    <Translate contentKey="sicoApp.jobHistory.employee">Employee</Translate>
                  </Label>
                  <AvInput id="job-history-employee" type="select" className="form-control" name="employee.id">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.firstName + ' ' + otherEntity.lastName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/job-history" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  jobs: storeState.job.entities,
  departments: storeState.department.entities,
  employees: storeState.employee.entities,
  jobHistoryEntity: storeState.jobHistory.entity,
  loading: storeState.jobHistory.loading,
  updating: storeState.jobHistory.updating,
  updateSuccess: storeState.jobHistory.updateSuccess
});

const mapDispatchToProps = {
  getJobs,
  getDepartments,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobHistoryUpdate);
