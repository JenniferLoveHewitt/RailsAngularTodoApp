require 'spec_helper'

describe TasksController do

  describe "index" do
    before do
      Task.create!(name: 'Task1')
      Task.create!(name: 'Learn Golang')
      Task.create!(name: 'Buy bread')
      Task.create!(name: 'Task4')

      xhr :get, :index, format: :json, keywords: keywords
    end

    subject(:results) { JSON.parse(response.body) }

    def extract_name
      ->(object) { object["name"] }
    end

    context "when the search finds results" do
      let(:keywords) { 'Task' }

      it 'should 200' do
        expect(response.status).to eq(200)
      end
      it 'should return two results' do
        expect(results.size).to eq(2)
      end
      it "should include 'Task1'" do
        expect(results.map(&extract_name)).to include('Task1')
      end
      it "should include 'Task4'" do
        expect(results.map(&extract_name)).to include('Task4')
      end
    end

    context "when the search doesn't find results" do
      let(:keywords) { 'lol' }
      it 'should return no results' do
        expect(results.size).to eq(0)
      end
    end
  end
end