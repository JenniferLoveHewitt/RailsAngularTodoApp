class TasksController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    @tasks = if params[:keywords]
                 Task.where('name like ?', "%#{params[:keywords]}%")
               else
                 Task.all
               end
  end

  def create
    @task = Task.new task_param
    @task.save
  end

  def destroy
    task = Task.find params[:id]
    task.destroy
  end

  def update
    task = Task.find params[:id]
    task.update_attributes task_param
  end

  private

    def task_param
      params.require(:task).permit(:name, :active)
    end
end
